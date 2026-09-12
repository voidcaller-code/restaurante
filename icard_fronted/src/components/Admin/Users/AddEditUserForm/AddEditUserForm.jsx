import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useUser } from '../../../../hooks'

import './AddEditUserForm.scss'

export function AddEditUserForm(props) {
  const { onClose, onRefetch, user } = props

  const { addUser, updateUser } = useUser()

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: user ? updateSchema() : newSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = { ...formValue }

        // Si estamos actualizando y la contraseña viene vacía,
        // no la enviamos al backend.
        if (user && !data.password) {
          delete data.password
        }

        if (user) {
          await updateUser(user.id, data)
        } else {
          await addUser(data)
        }

        onRefetch()
        onClose()
      } catch (error) {
        console.error(error)
      }
    },
  })

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre de usuario</Form.Label>

        <Form.Control
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.username)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Correo electrónico</Form.Label>

        <Form.Control
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.email)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>

        <Form.Control
          name="first_name"
          type="text"
          placeholder="Nombre"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.first_name)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.first_name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Apellidos</Form.Label>

        <Form.Control
          name="last_name"
          type="text"
          placeholder="Apellidos"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.last_name)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.last_name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>

        <Form.Control
          name="password"
          type="password"
          placeholder={
            user
              ? 'Dejar vacío para no cambiar la contraseña'
              : 'Contraseña'
          }
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.password)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="user-is-active"
          label="Usuario activo"
          checked={formik.values.is_active}
          onChange={(event) =>
            formik.setFieldValue('is_active', event.target.checked)
          }
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="user-is-staff"
          label="Usuario administrador"
          checked={formik.values.is_staff}
          onChange={(event) =>
            formik.setFieldValue('is_staff', event.target.checked)
          }
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        {user ? 'Actualizar' : 'Crear'}
      </Button>
    </Form>
  )
}

function initialValues(data) {
  return {
    username: data?.username || '',
    email: data?.email || '',
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    password: '',
    is_active: data?.is_active ?? false,
    is_staff: data?.is_staff ?? false,
  }
}

function newSchema() {
  return Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    email: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required('La contraseña es obligatoria'),
    is_active: Yup.boolean().required(),
    is_staff: Yup.boolean().required(),
  })
}

function updateSchema() {
  return Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    email: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.boolean().required(),
    is_staff: Yup.boolean().required(),
  })
}