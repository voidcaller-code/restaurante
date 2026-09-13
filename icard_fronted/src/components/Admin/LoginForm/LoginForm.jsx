import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

import { loginApi } from '../../../api/user'
import { useAuth } from '../../../hooks'

import './LoginForm.scss'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue)

        const { access } = response

        await login(access)

        toast.success('Sesión iniciada correctamente')

        navigate('/admin')
      } catch (error) {
        toast.error('Usuario o contraseña incorrectos')
      }
    },
  })

  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
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
        <Form.Control
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.password)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Iniciar sesión
      </Button>
    </Form>
  )
}

function initialValues() {
  return {
    email: '',
    password: '',
  }
}

function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),

    password: Yup.string()
      .required('La contraseña es obligatoria'),
  })
}