import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { Spinner } from 'react-bootstrap'

import { useProduct } from '../../hooks'
import { ListProducts } from '../../components/Client'

export function Products() {
  const { tableNumber, idCategory } = useParams()
  const { loading, products, getProductsByCategory } = useProduct()

  useEffect(() => {
    getProductsByCategory(idCategory)
  }, [idCategory])

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categorías</Link>

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