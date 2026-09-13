import { Button, Image, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'

import './TableCategoryAdmin.scss'

export function TableCategoryAdmin(props) {
  const {
    categories = { retData: [] },
    updateCategory,
    deleteCategory,
  } = props

  const categoryList = categories?.retData || []

  return (
    <Table
      responsive
      striped
      bordered
      hover
      className="table-category-admin align-middle"
    >
      <thead className="text-center">
        <tr>
          <th className="table-category-admin__id-cell">
            ID
          </th>

          <th className="table-category-admin__image-cell">
            Imagen
          </th>

          <th>
            Categoría
          </th>

          <th className="table-category-admin__actions-cell">
            Acciones
          </th>
        </tr>
      </thead>

      <tbody className="text-center">
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <tr key={category.id}>
              <td className="table-category-admin__id-cell">
                {category.id}
              </td>

              <td className="table-category-admin__image-cell">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.title}
                    className="table-category-admin__image"
                    thumbnail
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>

              <td>
                {category.title}
              </td>

              <td className="table-category-admin__actions-cell">
                <Actions
                  category={category}
                  updateCategory={updateCategory}
                  deleteCategory={deleteCategory}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center"
            >
              No hay categorías registradas.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

// Recuperamos en el actions lo que viene de CategoriesAdmin
function Actions(props) {
  const {
    category,
    updateCategory,
    deleteCategory,
  } = props

  return (
    <div className="table-category-admin__actions">
      <Button
        type="button"
        variant="warning"
        size="sm"
        onClick={() => updateCategory(category)}
      >
        <FaEdit />
      </Button>

      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => deleteCategory(category)}
      >
        <FaTrash />
      </Button>
    </div>
  )
}