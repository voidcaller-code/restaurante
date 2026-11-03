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
        .typeError('Quantity must be a number')
        .integer('Quantity must be an integer')
        .min(1, 'Quantity must be greater than zero')
        .max(maximumQuantity, 'Quantity exceeds the allowed stock')
        .required('Quantity is required'),
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
          requestError.message || 'Unable to restock the product.',
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
      <p className="text-muted">Current stock: {inventoryItem.stock}</p>

      <Form.Group className="mb-3">
        <Form.Label>Units to add</Form.Label>
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

      <p>New stock: {inventoryItem.stock + Number(formik.values.quantity || 0)}</p>

      <Button
        type="submit"
        variant="success"
        className="w-100"
        disabled={formik.isSubmitting || maximumQuantity < 1}
      >
        {formik.isSubmitting ? (
          <Spinner animation="border" size="sm" />
        ) : (
          'Restock'
        )}
      </Button>
    </Form>
  )
}
