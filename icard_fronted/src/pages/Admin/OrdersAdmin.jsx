import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { HeaderPage, TablesListAdmin } from '../../components/Admin'
import { useTable } from '../../hooks'

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable()

  useEffect(() => {
    getTables()
  }, [])

  return (
    <>
      <HeaderPage title="Restaurante" />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  )
}