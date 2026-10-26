import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaCreditCard, FaEye, FaMoneyBillWave } from 'react-icons/fa'

import { ModalBasic } from '../../../Common'
import { PaymentProductList } from '../PaymentProductList'
import { PAYMENT_TYPE } from '../../../../utils/constants'

import './TablePayments.scss'

export function TablePayments(props) {
  const { payments = [] } = props

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)

  const openCloseModal = () => setShowModal((prev) => !prev)

  const getPaymentTypeIcon = (key) => {
    if (key === PAYMENT_TYPE.CARD) return <FaCreditCard />
    if (key === PAYMENT_TYPE.CASH) return <FaMoneyBillWave />

    return null
  }

  const showDetails = (payment) => {
    setTitleModal(`Pedidos de la mesa ${payment.table_data?.id || ''}`)
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
        <thead className="text-center">
          <tr>
            <th>ID Mesa</th>
            <th>Total</th>
            <th>Tipo de pago</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.totalPayment} $</td>
                <td>{getPaymentTypeIcon(payment.paymentType)}</td>
                <td>{formatDate(payment.created_at)}</td>
                <td>
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
              <td colSpan="5">
                No hay pagos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        size="large"
      >
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
