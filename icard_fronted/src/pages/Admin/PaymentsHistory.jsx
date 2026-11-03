import { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { HeaderPage, TablePayments } from '../../components/Admin'
import { useBranch, usePayment } from '../../hooks'

export function PaymentsHistory() {
  const { loading, error, payments, getPayments } = usePayment()
  const { selectedBranch, loadingBranches } = useBranch()

  useEffect(() => {
    if (!selectedBranch) return

    getPayments(selectedBranch.id)
  }, [selectedBranch, getPayments])

  return (
    <>
      <HeaderPage
        title={`Historial de pagos${
          selectedBranch ? ` - ${selectedBranch.name}` : ''
        }`}
      />

      {loadingBranches || (selectedBranch && loading) ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : !selectedBranch ? (
        <Alert variant="warning">No hay una sede disponible.</Alert>
      ) : error ? (
        <Alert variant="danger">No fue posible cargar los pagos.</Alert>
      ) : (
        <TablePayments payments={payments} />
      )}
    </>
  )
}
