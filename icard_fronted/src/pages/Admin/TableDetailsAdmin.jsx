import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import { HeaderPage, AddOrderForm } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import {
  ListOrderAdmin,
  PaymentDetail,
} from '../../components/Admin/TableDetails'
import { useOrder, useTable, usePayment } from '../../hooks'

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { id } = useParams()

  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { table, getTable } = useTable()
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

  const onCreatePayment = async () => {
    const result = window.confirm(
      '¿Estás seguro de generar la cuenta de la mesa?'
    )

    if (!result) return

    let totalPayment = 0

    orders.forEach((order) => {
      totalPayment += Number(order.product_data.price)
    })

    const resultTypePayment = window.confirm(
      '¿Pago con tarjeta? Pulsa ACEPTAR para tarjeta o CANCELAR para efectivo.'
    )

    const newPaymentData = {
      table: id,
      totalPayment: totalPayment.toFixed(2),
      paymentType: resultTypePayment ? 'CARD' : 'CASH',
      statusPayment: 'PENDING',
    }

    const payment = await createPayment(newPaymentData)

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id)
    }

    onReloadOrders()
  }

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ''}`}
        btnTitle={paymentData ? 'Ver cuenta' : 'Añadir pedido'}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? 'Generar cuenta' : null}
        btnClickTwo={onCreatePayment}
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
    </>
  )
}