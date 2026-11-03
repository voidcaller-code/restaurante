import { Button, Image, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'

import './TableProductAdmin.scss'

export function TableProductAdmin(props) {
  const { products = [], updateProduct, deleteProduct } = props

  return (
    <Table
      responsive
      striped
      bordered
      hover
      className="table-product-admin align-middle"
    >
      <thead className="text-center">
        <tr>
          <th className="table-product-admin__id-cell">ID</th>
          <th className="table-product-admin__image-cell">Image</th>
          <th>Product</th>
          <th>Price</th>
          <th>Category</th>
          <th>Active</th>
          <th className="table-product-admin__actions-cell">Actions</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className="table-product-admin__image-cell">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="table-product-admin__image"
                    thumbnail
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>

              <td>{product.title}</td>
              <td>{product.price} $</td>
              <td>{product.category_data?.title || 'No category'}</td>

              <td>
                {product.active ? (
                  <FaCheck className="table-product-admin__icon table-product-admin__icon--active" />
                ) : (
                  <FaTimes className="table-product-admin__icon table-product-admin__icon--inactive" />
                )}
              </td>

              <td className="table-product-admin__actions-cell">
                <Actions
                  product={product}
                  updateProduct={updateProduct}
                  deleteProduct={deleteProduct}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No products are registered.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function Actions(props) {
  const { product, updateProduct, deleteProduct } = props

  return (
    <div className="table-product-admin__actions">
      <Button
        type="button"
        variant="warning"
        size="sm"
        onClick={() => updateProduct(product)}
      >
        <FaEdit />
      </Button>

      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => deleteProduct(product)}
      >
        <FaTrash />
      </Button>
    </div>
  )
}
