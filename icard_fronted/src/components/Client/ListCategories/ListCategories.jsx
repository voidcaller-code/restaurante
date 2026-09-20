import { Image } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'

import './ListCategories.scss'

export function ListCategories(props) {
  const { categories = [] } = props

  const location = useLocation()
  const navigate = useNavigate()

  const goToCategory = (id) => {
    navigate(`${location.pathname}/${id}`)
  }

  return (
    <div className="list-categories-client">
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className="list-categories-client__category"
            onClick={() => goToCategory(category.id)}
          >
            {category.image && (
              <Image
                src={category.image}
                alt={category.title}
                className="list-categories-client__image"
              />
            )}

            <span>{category.title}</span>
          </button>
        ))
      ) : (
        <p className="text-muted">No hay categorías disponibles.</p>
      )}
    </div>
  )
}