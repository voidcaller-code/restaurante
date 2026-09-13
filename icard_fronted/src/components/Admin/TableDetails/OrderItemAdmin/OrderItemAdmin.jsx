import { Button, Image } from 'react-bootstrap'

import { useOrder } from '../../../../hooks'
import { ORDER_STATUS } from '../../../../utils/constants'

import './OrderItemAdmin.scss'

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props

  const { checkDeliveredOrder } = useOrder()

  const { title, image } = order.product_data || {}

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id)
    onReloadOrders()
  }

  const statusClass = order.status?.toLowerCase() || ''

  return (
    <div className={`order-item-admin ${statusClass}`}>
      <div className="order-item-admin__time">
        <span>{formatHour(order.created_at)}</span>
        {' - '}
        <span>{formatTimeAgo(order.created_at)}</span>
      </div>

      <div className="order-item-admin__product">
        {image && (
          <Image
            src={image}
            alt={title}
            className="order-item-admin__image"
          />
        )}

        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING && (
        <Button variant="primary" onClick={onCheckDeliveredOrder}>
          Marcar entregado
        </Button>
      )}
    </div>
  )
}

function formatHour(date) {
  if (!date) return ''

  return new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function formatTimeAgo(date) {
  if (!date) return ''

  const now = new Date()
  const createdAt = new Date(date)
  const diffMs = now - createdAt

  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return 'hace unos segundos'
  if (diffMinutes < 60) return `hace ${diffMinutes} min`
  if (diffHours < 24) return `hace ${diffHours} h`

  return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
}