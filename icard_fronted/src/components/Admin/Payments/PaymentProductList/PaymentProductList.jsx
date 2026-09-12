import { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'

import { useOrder } from '../../../../hooks'

import './PaymentProductList.scss'

export function PaymentProductList(props) {
  const { payment } = props

  const [orders, setOrders] = useState([])
  const { getOrdersByPayment } = useOrder()

  useEffect(() => {
    const loadOrders = async () => {
      if (!payment?.id) return

      const response = await getOrdersByPayment(payment.id)
      setOrders(response || [])
    }

    loadOrders()
  }, [payment?.id])

  return (
    <div className="payment-product-list">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="payment-product-list__product" key={order.id}>
            <div className="payment-product-list__info">
              {order.product_data?.image && (
                <Image
                  src={order.product_data.image}
                  alt={order.product_data.title}
                  roundedCircle
                  className="payment-product-list__image"
                />
              )}

              <span>{order.product_data?.title}</span>
            </div>

            <span>{order.product_data?.price} €</span>
          </div>
        ))
      ) : (
        <p className="text-muted mb-0">No hay productos asociados a este pago.</p>
      )}
    </div>
  )
}