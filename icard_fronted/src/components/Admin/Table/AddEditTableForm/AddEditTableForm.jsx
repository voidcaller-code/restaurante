import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useTable } from '../../../../hooks'

import './AddEditTableForm.scss'

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table, branchId } = props
  const { addTable, updateTable } = useTable()

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (table) {
          await updateTable(table.id, formValue)
        } else {
          await addTable({
            ...formValue,
            branch: branchId,
          })
        }

        onRefetch()
        onClose()
      } catch (error) {
        console.error(error)
      }
    },
  })

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Table type</Form.Label>

        <Form.Select
          name="tipo"
          value={formik.values.tipo}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.tipo)}
        >
          <option value="">Select a table type</option>
          <option value="NI">Children</option>
          <option value="ES">Standard</option>
          <option value="VIP">VIP</option>
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {formik.errors.tipo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Capacity</Form.Label>

        <Form.Control
          name="capacity"
          type="number"
          min="1"
          max="10"
          step="1"
          placeholder="Number of people"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.capacity)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.capacity}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        {table ? 'Update' : 'Create'}
      </Button>
    </Form>
  )
}

function initialValues(data) {
  return {
    tipo: data?.tipo ?? 'ES',
    capacity: data?.capacity ?? '',
  }
}

function validationSchema() {
  return Yup.object({
    tipo: Yup.string()
      .oneOf(['NI', 'ES', 'VIP'], 'Select a valid table type')
      .required('Table type is required'),
    capacity: Yup.number()
      .typeError('Capacity must be a number')
      .integer('Capacity must be an integer')
      .min(1, 'Capacity must be greater than zero')
      .max(10, 'Capacity cannot be greater than 10')
      .required('Capacity is required'),
  })
}
