import { Button, Image, Table } from 'react-bootstrap'
import './TableCategoryAdmin.scss'

export function TableCategoryAdmin(props) {
  const { categories = [], updateCategory, deleteCategory } = props

  return (
    <Table
      responsive
      striped
      bordered
      hover
      className="table-category-admin align-middle"
    >
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Categoría</th>
          <th className="text-end">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <tr key={category.id || index}>
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

              <td>{category.title}</td>

              <td className="text-end">
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
            <td colSpan="3" className="text-center">
              No hay categorías registradas.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function Actions(props) {
  const { category, updateCategory, deleteCategory } = props

  return (
    <div className="table-category-admin__actions">
      <Button
        type="button"
        variant="warning"
        size="sm"
        onClick={() => updateCategory(category)}
      >
        Editar
      </Button>

      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => deleteCategory(category)}
      >
        Eliminar
      </Button>
    </div>
  )
}