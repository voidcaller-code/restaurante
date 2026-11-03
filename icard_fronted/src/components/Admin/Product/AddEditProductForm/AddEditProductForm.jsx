
import { useEffect, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useCategory, useProduct } from '../../../../hooks'

import './AddEditProductForm.scss'

export function AddEditProductForm(props) {
  const { onClose, onRefetch, product } = props

  const [previewImage, setPreviewImage] = useState(product?.image || null)

  const { categories = [], getCategories } = useCategory()
  const categoryList = Array.isArray(categories)
  ? categories
  : categories?.retData || []

  const { addProduct, updateProduct } = useProduct()

  useEffect(() => {
    getCategories()
  }, [])

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: product ? updateSchema() : newSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (product) {
          await updateProduct(product.id, formValue)
        } else {
          await addProduct(formValue)
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
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product name</Form.Label>

        <Form.Control
          name="title"
          type="text"
          placeholder="Product name"
          value={formik.values.title}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.title)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>

        <Form.Control
          name="price"
          type="number"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.price)}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.price}
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>

        <Form.Select
          name="category"
          value={formik.values.category}
          onChange={(event) => {
            const value = event.target.value

            formik.setFieldValue(
              'category',
              value === '' ? '' : Number(value)
            )
          }}
          isInvalid={Boolean(formik.errors.category)}
        >
          <option value="">Select a category</option>

          {categoryList.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.title}
            </option>
          ))}
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {formik.errors.category}
        </Form.Control.Feedback>
      </Form.Group>
      

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="product-active"
          label="Active product"
          checked={formik.values.active}
          onChange={(event) =>
            formik.setFieldValue('active', event.target.checked)
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>

        <div
          {...getRootProps()}
          className={`add-edit-product-form__dropzone ${
            formik.errors.image ? 'add-edit-product-form__dropzone--error' : ''
          }`}
        >
          <input {...getInputProps()} />

          <Button type="button" variant={formik.errors.image ? 'danger' : 'outline-primary'}>
            {previewImage ? 'Change image' : 'Upload image'}
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
            alt="Product preview"
            fluid
            thumbnail
            className="add-edit-product-form__image"
          />
        )}
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100 mt-4">
        {product ? 'Update' : 'Create'}
      </Button>
    </Form>
  )
}

function initialValues(data) {
  return {
    title: data?.title || '',
    price: data?.price || '',
    category: data?.category || data?.category_data?.id || '',
    active: data?.active ?? false,
    image: '',
  }
}

function newSchema() {
  return Yup.object({
    title: Yup.string().required('Product name is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    category: Yup.number()
      .typeError('Category is required')
      .required('Category is required'),
    active: Yup.boolean().required(),
    image: Yup.mixed().required('Image is required'),
  })
}

function updateSchema() {
  return Yup.object({
    title: Yup.string().required('Product name is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    category: Yup.number()
      .typeError('Category is required')
      .required('Category is required'),
    active: Yup.boolean().required(),
    image: Yup.mixed().nullable(),
  })
}