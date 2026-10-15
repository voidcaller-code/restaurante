import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { HeaderPage, TablePayments } from '../../components/Admin'
import { usePayment } from '../../hooks'

export function PaymentsHistory() {
  const { loading, payments, getPayments } = usePayment()

  useEffect(() => {
    getPayments()
  }, [])

  return (
    <>
      <HeaderPage title="Historial de pagos" />

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