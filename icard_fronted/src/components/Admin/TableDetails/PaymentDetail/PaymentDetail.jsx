import { Button, Table } from 'react-bootstrap'
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'

import { usePayment, useOrder } from '../../../../hooks'
import { PAYMENT_TYPE } from '../../../../utils/constants'

import './PaymentDetail.scss'

export function PaymentDetail(props) {
  const { payment, orders = [], openCloseModal, onReloadOrders } = props

  const { closePayment } = usePayment()
  const { closeOrder } = useOrder()

  const getIconPayment = (key) => {
    if (key === PAYMENT_TYPE.CARD) return <FaCreditCard />
    if (key === PAYMENT_TYPE.CASH) return <FaMoneyBillWave />

    return null
  }

  const getPaymentName = (key) => {
    if (key === PAYMENT_TYPE.CARD) return 'Card'
    if (key === PAYMENT_TYPE.CASH) return 'Cash'

    return 'Not defined'
  }

  const onCloseTable = async () => {
    const result = window.confirm('Close the table for new customers?')

    if (!result) return

    await closePayment(payment.id)

    for await (const order of orders) {
      await closeOrder(order.id)
    }

    onReloadOrders()
    openCloseModal()
  }

  return (
    <div className="payment-detail">
      <Table striped bordered className="align-middle">
        <tbody>
          <tr>
            <td>Table:</td>
            <td>{payment.table_data.id}</td>
          </tr>

          <tr>
            <td>Total:</td>
            <td>{payment.totalPayment} $</td>
          </tr>

          <tr>
            <td>Payment method:</td>
            <td className="payment-detail__payment-type">
              {getIconPayment(payment.paymentType)}
              <span>{getPaymentName(payment.paymentType)}</span>
            </td>
          </tr>
        </tbody>
      </Table>

      <Button variant="primary" className="w-100" onClick={onCloseTable}>
        Mark as paid and close table
      </Button>
    </div>
  )
}
