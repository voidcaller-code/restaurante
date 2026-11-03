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

        toast.success('Signed in successfully')

        navigate('/admin')
      } catch {
        toast.error('Incorrect email or password')
      }
    },
  })

  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          name="email"
          type="email"
          placeholder="Email"
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
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.password)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Sign in
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
      .email('Enter a valid email address')
      .required('Email is required'),

    password: Yup.string()
      .required('Password is required'),
  })
}
