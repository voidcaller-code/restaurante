import { useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useCategory } from '../../../../hooks'
import './AddEditCategoryForm.scss'

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch, category } = props

  const [previewImage, setPreviewImage] = useState(category?.image || null)

  const { addCategory, updateCategory } = useCategory()

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: category ? updateSchema() : newSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) {
          await updateCategory(category.id, formValue)
        } else {
          await addCategory(formValue)
        }

        onRefetch()
        onClose()
      } catch (error) {
        console.error(error)
      }
    },
  })

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]

    if (!file) return

    await formik.setFieldValue('image', file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    noKeyboard: true,
    multiple: false,
    onDrop,
  })

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre de la categoría</Form.Label>

        <Form.Control
          name="title"
          type="text"
          placeholder="Nombre de la categoría"
          value={formik.values.title}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.title)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen</Form.Label>

        <div
          {...getRootProps()}
          className={`add-edit-category-form__dropzone ${
            formik.errors.image ? 'add-edit-category-form__dropzone--error' : ''
          }`}
        >
          <input {...getInputProps()} />

          <Button type="button" variant={formik.errors.image ? 'danger' : 'outline-primary'}>
            {previewImage ? 'Cambiar imagen' : 'Subir imagen'}
          </Button>
        </div>

        {formik.errors.image && (
          <div className="invalid-feedback d-block">
            {formik.errors.image}
          </div>
        )}

        {previewImage && (
          <Image
            src={previewImage}
            alt="Vista previa de categoría"
            fluid
            thumbnail
            className="add-edit-category-form__image"
          />
        )}
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100 mt-4">
        {category ? 'Actualizar' : 'Crear'}
      </Button>
    </Form>
  )
}

function initialValues(data) {
  return {
    title: data?.title || '',
    image: '',
  }
}

function newSchema() {
  return Yup.object({
    title: Yup.string().required('El nombre de la categoría es obligatorio'),
    image: Yup.mixed().required('La imagen es obligatoria'),
  })
}

function updateSchema() {
  return Yup.object({
    title: Yup.string().required('El nombre de la categoría es obligatorio'),
    image: Yup.mixed().nullable(),
  })
}