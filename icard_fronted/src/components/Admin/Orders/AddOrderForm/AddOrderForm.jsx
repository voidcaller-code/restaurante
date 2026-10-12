import { useEffect, useMemo } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useProduct, useOrder } from '../../../../hooks'

import './AddOrderForm.scss'

export function AddOrderForm(props) {
  const { idTable, openCloseModal, onReloadOrders } = props

  const { products = [], getProducts } = useProduct()
  const { addOrderToTable } = useOrder()

  useEffect(() => {
    getProducts()
  }, [])

  const productsOptions = useMemo(() => {
    return products.map((product) => ({
      value: product.id,
      label: product.title,
    }))
  }, [products])

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        for await (const idProduct of formValue.products) {
          await addOrderToTable(idTable, idProduct)
        }

        onReloadOrders()
        openCloseModal()
      } catch (error) {
        console.error(error)
      }
    },
  })

  const selectedProducts = formik.values.products
    .map((idProduct) => products.find((product) => product.id === idProduct))
    .filter(Boolean)

  const addProductToList = (event) => {
    const value = Number(event.target.value)

    if (!value) return

    formik.setFieldValue('products', [
      ...formik.values.products,
      value,
    ])

    event.target.value = ''
  }

  const removeProductList = (index) => {
    const idProducts = [...formik.values.products]
    idProducts.splice(index, 1)

    formik.setFieldValue('products', idProducts)
  }

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Productos</Form.Label>

        <Form.Select
          defaultValue=""
          onChange={addProductToList}
          isInvalid={Boolean(formik.errors.products)}
        >
          <option value="">Seleccione un producto</option>

          {productsOptions.map((product) => (
            <option key={product.value} value={product.value}>
              {product.label}
            </option>
          ))}
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {formik.errors.products}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="add-order-form__list">
        {selectedProducts.length > 0 ? (
          selectedProducts.map((product, index) => (
            <div className="add-order-form__list-product" key={`${product.id}-${index}`}>
              <div className="add-order-form__product-info">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.title}
                    roundedCircle
                    className="add-order-form__product-image"
                  />
                )}

                <span>{product.title}</span>
              </div>

              <Button
                type="button"
                variant="outline-danger"
                size="sm"
                onClick={() => removeProductList(index)}
              >
                Eliminar
              </Button>
            </div>
          ))
        ) : (
          <p className="text-muted mb-0">
            No has seleccionado productos.
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-100 mt-5">
        Añadir productos a la mesa
      </Button>
    </Form>
  )
}

function initialValues() {
  return {
    products: [],
  }
}

function validationSchema() {
  return Yup.object({
    products: Yup.array()
      .min(1, 'Debes seleccionar al menos un producto')
      .required('Debes seleccionar al menos un producto'),
  })
}