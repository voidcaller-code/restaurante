import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { Alert, Spinner } from 'react-bootstrap'

import { useProduct } from '../../hooks'
import { ListProducts } from '../../components/Client'

export function Products() {
  const { idTable, idCategory } = useParams()
  const {
    loading,
    error,
    products,
    getAvailableProductsByCategory,
  } = useProduct()

  useEffect(() => {
    getAvailableProductsByCategory(idTable, idCategory)
  }, [getAvailableProductsByCategory, idCategory, idTable])

  return (
    <div>
      <Link to={`/client/${idTable}`}>Volver a categorías</Link>

      {error && (
        <Alert variant="danger" className="mt-3">
          No fue posible cargar los productos disponibles.
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <ListProducts products={products} />
      )}
    </div>
  )
}
