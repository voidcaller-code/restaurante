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
        <Form.Label>Tipo de mesa</Form.Label>

        <Form.Select
          name="tipo"
          value={formik.values.tipo}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.tipo)}
        >
          <option value="">Selecciona un tipo de mesa</option>
          <option value="NI">Niños</option>
          <option value="ES">Estándar</option>
          <option value="VIP">VIP</option>
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {formik.errors.tipo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Capacidad</Form.Label>

        <Form.Control
          name="capacity"
          type="number"
          min="1"
          max="10"
          step="1"
          placeholder="Cantidad de personas"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.capacity)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.capacity}
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
    tipo: data?.tipo ?? 'ES',
    capacity: data?.capacity ?? '',
  }
}

function validationSchema() {
  return Yup.object({
    tipo: Yup.string()
      .oneOf(['NI', 'ES', 'VIP'], 'Selecciona un tipo de mesa válido')
      .required('El tipo de mesa es obligatorio'),
    capacity: Yup.number()
      .typeError('La capacidad debe ser un número')
      .integer('La capacidad debe ser un número entero')
      .min(1, 'La capacidad debe ser mayor que cero')
      .max(10, 'La capacidad no puede ser mayor que 10')
      .required('La capacidad es obligatoria'),
  })
}
