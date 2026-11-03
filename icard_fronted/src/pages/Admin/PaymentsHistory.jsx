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
        title={`Payment history${
          selectedBranch ? ` - ${selectedBranch.name}` : ''
        }`}
      />

      {loadingBranches || (selectedBranch && loading) ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : !selectedBranch ? (
        <Alert variant="warning">No branch is available.</Alert>
      ) : error ? (
        <Alert variant="danger">Unable to load payments.</Alert>
      ) : (
        <TablePayments payments={payments} />
      )}
    </>
  )
}
