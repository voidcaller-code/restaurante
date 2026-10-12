import { OrderItemAdmin } from '../OrderItemAdmin'
import './ListOrderAdmin.scss'

export function ListOrderAdmin(props) {
  const { orders = [], onReloadOrders } = props

  return (
    <div className="list-orders-admin">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderItemAdmin
            key={order.id}
            order={order}
            onReloadOrders={onReloadOrders}
          />
        ))
      ) : (
        <p className="text-muted">No hay pedidos para esta mesa.</p>
      )}
    </div>
  )
}