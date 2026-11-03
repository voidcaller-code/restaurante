import { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { HeaderPage, TablesListAdmin } from '../../components/Admin'
import { useBranch, useTable } from '../../hooks'

export function OrdersAdmin() {
  const { loading, error, tables, getTables } = useTable()
  const { selectedBranch, loadingBranches } = useBranch()

  useEffect(() => {
    if (!selectedBranch) return

    getTables(selectedBranch.id)
  }, [selectedBranch, getTables])

  return (
    <>
      <HeaderPage
        title={`Pedidos${selectedBranch ? ` - ${selectedBranch.name}` : ''}`}
      />

      {loadingBranches || (selectedBranch && loading) ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : !selectedBranch ? (
        <Alert variant="warning">No hay una sede disponible.</Alert>
      ) : error ? (
        <Alert variant="danger">No fue posible cargar los pedidos.</Alert>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  )
}
