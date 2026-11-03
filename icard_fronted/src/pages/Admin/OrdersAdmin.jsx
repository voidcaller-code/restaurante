import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { HeaderPage, TablesListAdmin } from '../../components/Admin'
import { useBranch, useTable } from '../../hooks'

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable()
  const { selectedBranch } = useBranch()

  useEffect(() => {
    if (!selectedBranch) return

    getTables(selectedBranch.id)
  }, [selectedBranch, getTables])

  return (
    <>
      <HeaderPage
        title={`Pedidos${selectedBranch ? ` - ${selectedBranch.name}` : ''}`}
      />

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
