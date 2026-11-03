import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { getProductsApi } from '../../../../api/product'
import { useInventory } from '../../../../hooks'

const MAX_STOCK = 2147483647

export function AddEditInventoryForm(props) {
  const {
    branchId,
    inventoryItem,
    excludedProductIds = [],
    onClose,
    onRefetch,
  } = props
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(!inventoryItem)
  const [productsError, setProductsError] = useState(null)
  const { addInventory, updateInventory } = useInventory()

  useEffect(() => {
    if (inventoryItem) return

    let ignore = false

    getProductsApi(100)
      .then((response) => {
        if (!ignore) setProducts(response?.retData ?? [])
      })
      .catch((requestError) => {
        if (!ignore) setProductsError(requestError)
      })
      .finally(() => {
        if (!ignore) setLoadingProducts(false)
      })

    return () => {
      ignore = true
    }
  }, [inventoryItem])

  const availableProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.active && !excludedProductIds.includes(product.id),
      ),
    [excludedProductIds, products],
  )

  const formik = useFormik({
    initialValues: initialValues(inventoryItem),
    validationSchema: validationSchema(Boolean(inventoryItem)),
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus(null)

        if (inventoryItem) {
          await updateInventory(inventoryItem.id, {
            stock: Number(values.stock),
            active: values.active,
          })
        } else {
          await addInventory({
            branch: branchId,
            product: values.product,
            stock: Number(values.stock),
            active: values.active,
          })
        }

        onRefetch()
        onClose()
      } catch (requestError) {
        helpers.setStatus(
          requestError.message || 'No fue posible guardar el inventario.',
        )
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      {formik.status && <Alert variant="danger">{formik.status}</Alert>}
      {productsError && (
        <Alert variant="danger">No fue posible cargar los productos.</Alert>
      )}

      {inventoryItem ? (
        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Control
            value={inventoryItem.product_data?.title || 'Producto no disponible'}
            disabled
          />
        </Form.Group>
      ) : (
        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Select
            name="product"
            value={formik.values.product}
            onChange={(event) =>
              formik.setFieldValue(
                'product',
                event.target.value ? Number(event.target.value) : '',
              )
            }
            isInvalid={Boolean(formik.errors.product)}
            disabled={loadingProducts}
          >
            <option value="">
              {loadingProducts
                ? 'Cargando productos...'
                : 'Seleccione un producto'}
            </option>
            {availableProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.product}
          </Form.Control.Feedback>
          {!loadingProducts && availableProducts.length === 0 && (
            <Form.Text>No hay productos activos pendientes por agregar.</Form.Text>
          )}
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          name="stock"
          type="number"
          min="0"
          step="1"
          value={formik.values.stock}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.stock)}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.stock}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="inventory-active"
          label="Disponible en esta sede"
          checked={formik.values.active}
          onChange={(event) =>
            formik.setFieldValue('active', event.target.checked)
          }
        />
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="w-100"
        disabled={
          formik.isSubmitting ||
          (!inventoryItem && availableProducts.length === 0)
        }
      >
        {formik.isSubmitting ? (
          <Spinner animation="border" size="sm" />
        ) : inventoryItem ? (
          'Actualizar'
        ) : (
          'Agregar al inventario'
        )}
      </Button>
    </Form>
  )
}

function initialValues(item) {
  return {
    product: item?.product ?? '',
    stock: item?.stock ?? 0,
    active: item?.active ?? true,
  }
}

function validationSchema(isEditing) {
  return Yup.object({
    product: isEditing
      ? Yup.number().nullable()
      : Yup.number()
          .typeError('Seleccione un producto')
          .required('Seleccione un producto'),
    stock: Yup.number()
      .typeError('El stock debe ser un número')
      .integer('El stock debe ser un número entero')
      .min(0, 'El stock no puede ser negativo')
      .max(MAX_STOCK, 'El stock es demasiado alto')
      .required('El stock es obligatorio'),
    active: Yup.boolean().required(),
  })
}
