import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'

import { OrderHistoryItem } from '../../components/Client'
import { ModalConfirm } from '../../components/Common'
import { useOrder, useTable, usePayment } from '../../hooks'

export function OrdersHistory() {
  const [idTable, setIdTable] = useState(null)
  const [showTypePayment, setShowTypePayment] = useState(false)
  const [isRequestAccount, setIsRequestAccount] = useState([])

  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { getTableByNumber } = useTable()
  const { createPayment, getPaymentByTable } = usePayment()

  const { tableNumber } = useParams()

  useEffect(() => {
    const loadTableAndOrders = async () => {
      const table = await getTableByNumber(tableNumber)

      if (!table || table.length === 0) return

      const idTableTemp = table[0].id

      setIdTable(idTableTemp)
      getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at')
    }

    loadTableAndOrders()
  }, [tableNumber])

  useEffect(() => {
    const loadPayment = async () => {
      if (!idTable) return

      const response = await getPaymentByTable(idTable)
      setIsRequestAccount(response || [])
    }

    loadPayment()
  }, [idTable])

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false)

    let totalPayment = 0

    orders.forEach((order) => {
      totalPayment += Number(order.product_data.price)
    })

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: 'PENDING',
    }

    const payment = await createPayment(paymentData)

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id)
    }

    window.location.reload()
  }

  return (
    <div>
      <h1>Historial de pedidos</h1>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <>
          {orders.length > 0 && (
            <Button
              variant="primary"
              className="w-100"
              onClick={() =>
                isRequestAccount.length === 0 && setShowTypePayment(true)
              }
            >
              {isRequestAccount.length > 0
                ? 'La cuenta ya está pedida'
                : 'Pedir la cuenta'}
            </Button>
          )}

          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderHistoryItem key={order.id} order={order} />
            ))
          ) : (
            <p className="text-muted mt-3">No tienes pedidos registrados.</p>
          )}
        </>
      )}

      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment('CASH')}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment('CARD')}
      />
    </div>
  )
}