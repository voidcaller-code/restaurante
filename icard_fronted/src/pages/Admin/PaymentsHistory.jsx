import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { HeaderPage, TablePayments } from '../../components/Admin'
import { useBranch, usePayment } from '../../hooks'

export function PaymentsHistory() {
  const { loading, payments, getPayments } = usePayment()
  const { selectedBranch } = useBranch()

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

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <TablePayments payments={payments} />
      )}
    </>
  )
}
