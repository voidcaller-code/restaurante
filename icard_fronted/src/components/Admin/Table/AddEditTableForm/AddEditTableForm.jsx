import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useTable } from '../../../../hooks'

import './AddEditTableForm.scss'

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props
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
          await addTable(formValue)
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
        <Form.Label>Número de la mesa</Form.Label>

        <Form.Control
          name="number"
          type="number"
          placeholder="Número de la mesa"
          value={formik.values.number}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.number)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.number}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        {table ? 'Actualizar' : 'Crear'}
      </Button>
    </Form>
  )
}

function initialValues(data) {
  return {
    number: data?.number || '',
  }
}

function validationSchema() {
  return Yup.object({
    number: Yup.number()
      .typeError('El número de la mesa debe ser un número')
      .required('El número de la mesa es obligatorio'),
  })
}