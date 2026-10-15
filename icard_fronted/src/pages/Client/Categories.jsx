import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

import { useCategory } from '../../hooks'
import { ListCategories } from '../../components/Client'

export function Categories() {
  const { loading, categories, getCategories } = useCategory()

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <h3>Categorías</h3>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <ListCategories categories={categories} />
      )}
    </div>
  )
}