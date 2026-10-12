import { Image } from 'react-bootstrap'

import { ORDER_STATUS } from '../../../utils/constants'

import './OrderHistoryItem.scss'

export function OrderHistoryItem(props) {
  const { order } = props

  const { title, image } = order.product_data || {}

  const statusClass = order.status?.toLowerCase() || ''

  return (
    <div className={`order-history-item ${statusClass}`}>
      <div className="order-history-item__time">
        <span>Pedido {formatTimeAgo(order.created_at)}</span>
      </div>

      <div className="order-history-item__product">
        {image && (
          <Image
            src={image}
            alt={title}
            className="order-history-item__image"
          />
        )}

        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  )
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