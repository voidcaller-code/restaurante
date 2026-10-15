import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import { HeaderPage, AddOrderForm } from '../../components/Admin'
import { ModalBasic, ModalConfirm } from '../../components/Common'
import {
  ListOrderAdmin,
  PaymentDetail,
} from '../../components/Admin/TableDetails'
import { useOrder, useTable, usePayment } from '../../hooks'
import { PAYMENT_STATUS, PAYMENT_TYPE } from '../../utils/constants'

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [showPaymentMethod, setShowPaymentMethod] = useState(false)

  const { id } = useParams()

  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { getTable } = useTable()
  const { createPayment, getPaymentByTable } = usePayment()

  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [id, reloadOrders])

  useEffect(() => {
    getTable(id)
  }, [id])

  useEffect(() => {
    const loadPayment = async () => {
      const response = await getPaymentByTable(id)

      if (response?.length > 0) {
        setPaymentData(response[0])
      } else {
        setPaymentData(null)
      }
    }

    loadPayment()
  }, [id, reloadOrders])

  const onReloadOrders = () => setReloadOrders((prev) => !prev)
  const openCloseModal = () => setShowModal((prev) => !prev)

  const confirmPaymentCreation = () => {
    setShowPaymentConfirmation(false)
    setShowPaymentMethod(true)
  }

  const onCreatePayment = async (paymentType) => {
    setShowPaymentMethod(false)

    let totalPayment = 0

    orders.forEach((order) => {
      totalPayment += Number(order.product_data.price)
    })

    const newPaymentData = {
      table: id,
      totalPayment: totalPayment,
      paymentType,
      statusPayment: PAYMENT_STATUS.PENDING,
    }

    const payment = await createPayment(newPaymentData)

    if (!payment) return

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id)
    }

    onReloadOrders()
  }

  return (
    <>
      <HeaderPage
        title={`Mesa ${id || ''}`}
        btnTitle={paymentData ? 'Ver cuenta' : 'Añadir pedido'}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? 'Generar cuenta' : null}
        btnClickTwo={() => setShowPaymentConfirmation(true)}
        btnTitleThree={'Volver a pedidos'}
        btnClickThree={() => window.history.back()}
      />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={paymentData ? 'Detalle de cuenta' : 'Generar pedido'}
        size="large"
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>

      <ModalConfirm
        title="Generar cuenta"
        message="¿Estás seguro de generar la cuenta de la mesa?"
        show={showPaymentConfirmation}
        onClose={() => setShowPaymentConfirmation(false)}
        onCloseText="Cancelar"
        onCloseVariant="outline-secondary"
        onConfirm={confirmPaymentCreation}
        onConfirmText="Continuar"
        onConfirmVariant="primary"
      />

      <ModalConfirm
        title="Método de pago"
        message="¿Cómo deseas pagar la cuenta de la mesa?"
        show={showPaymentMethod}
        onClose={() => setShowPaymentMethod(false)}
        onCancel={() => onCreatePayment(PAYMENT_TYPE.CASH)}
        onCloseText="Efectivo"
        onCloseVariant="outline-primary"
        onConfirm={() => onCreatePayment(PAYMENT_TYPE.CARD)}
        onConfirmText="Tarjeta"
        onConfirmVariant="primary"
      />
    </>
  )
}
