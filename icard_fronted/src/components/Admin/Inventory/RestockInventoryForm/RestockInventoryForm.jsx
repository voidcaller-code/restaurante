import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useInventory } from '../../../../hooks'

const MAX_STOCK = 2147483647

export function RestockInventoryForm(props) {
  const { inventoryItem, onClose, onRefetch } = props
  const { updateInventory } = useInventory()
  const maximumQuantity = MAX_STOCK - inventoryItem.stock

  const formik = useFormik({
    initialValues: { quantity: 1 },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .typeError('La cantidad debe ser un número')
        .integer('La cantidad debe ser un número entero')
        .min(1, 'La cantidad debe ser mayor que cero')
        .max(maximumQuantity, 'La cantidad supera el stock permitido')
        .required('La cantidad es obligatoria'),
    }),
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus(null)
        await updateInventory(inventoryItem.id, {
          stock: inventoryItem.stock + Number(values.quantity),
        })
        onRefetch()
        onClose()
      } catch (requestError) {
        helpers.setStatus(
          requestError.message || 'No fue posible reponer el producto.',
        )
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      {formik.status && <Alert variant="danger">{formik.status}</Alert>}

      <p className="mb-1">
        <strong>{inventoryItem.product_data?.title}</strong>
      </p>
      <p className="text-muted">Stock actual: {inventoryItem.stock}</p>

      <Form.Group className="mb-3">
        <Form.Label>Unidades a agregar</Form.Label>
        <Form.Control
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.quantity)}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.quantity}
        </Form.Control.Feedback>
      </Form.Group>

      <p>Nuevo stock: {inventoryItem.stock + Number(formik.values.quantity || 0)}</p>

      <Button
        type="submit"
        variant="success"
        className="w-100"
        disabled={formik.isSubmitting || maximumQuantity < 1}
      >
        {formik.isSubmitting ? (
          <Spinner animation="border" size="sm" />
        ) : (
          'Reponer stock'
        )}
      </Button>
    </Form>
  )
}
