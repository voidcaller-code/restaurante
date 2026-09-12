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
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Activo</th>
          <th className="text-end">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td className="table-product-admin__image-cell">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="table-product-admin__image"
                    thumbnail
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>

              <td>{product.title}</td>
              <td>{product.price} €</td>
              <td>{product.category_data?.title || 'Sin categoría'}</td>

              <td>
                {product.active ? (
                  <FaCheck className="table-product-admin__icon table-product-admin__icon--active" />
                ) : (
                  <FaTimes className="table-product-admin__icon table-product-admin__icon--inactive" />
                )}
              </td>

              <td className="text-end">
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
              No hay productos registrados.
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