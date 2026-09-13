import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaCreditCard, FaEye, FaMoneyBillWave } from 'react-icons/fa'

import { ModalBasic } from '../../../Common'
import { PaymentProductList } from '../PaymentProductList'

import './TablePayments.scss'

export function TablePayments(props) {
  const { payments = [] } = props

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)

  const openCloseModal = () => setShowModal((prev) => !prev)

  const getPaymentTypeIcon = (key) => {
    if (key === 'CARD') return <FaCreditCard />
    if (key === 'CASH') return <FaMoneyBillWave />

    return null
  }

  const showDetails = (payment) => {
    setTitleModal(`Pedidos de la mesa ${payment.table_data?.number || ''}`)
    setContentModal(<PaymentProductList payment={payment} />)
    openCloseModal()
  }

  return (
    <>
      <Table
        responsive
        striped
        bordered
        hover
        className="table-payments-admin align-middle"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Mesa</th>
            <th>Total</th>
            <th>Tipo de pago</th>
            <th>Fecha</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.table_data?.number}</td>
                <td>{payment.totalPayment} €</td>
                <td>{getPaymentTypeIcon(payment.paymentType)}</td>
                <td>{formatDate(payment.created_at)}</td>
                <td className="text-end">
                  <Button
                    type="button"
                    variant="outline-primary"
                    size="sm"
                    onClick={() => showDetails(payment)}
                  >
                    <FaEye />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay pagos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal}>
        {contentModal}
      </ModalBasic>
    </>
  )
}

function formatDate(date) {
  if (!date) return ''

  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}