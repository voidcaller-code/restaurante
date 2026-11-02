import { Image } from 'react-bootstrap'
import { FaClock, FaUtensils } from 'react-icons/fa'

import { ORDER_STATUS } from '../../../utils/constants'

import './OrderHistoryItem.scss'

export function OrderHistoryItem(props) {
  const { order } = props

  const { title, image, price, category_data: category } =
    order.product_data || {}

  const statusClass = order.status?.toLowerCase() || ''
  const isPending = order.status === ORDER_STATUS.PENDING

  return (
    <article className={`order-history-item order-history-item--${statusClass}`}>
      <div className="order-history-item__media">
        {image ? (
          <Image
            src={image}
            alt={title || 'Producto del pedido'}
            className="order-history-item__image"
          />
        ) : (
          <FaUtensils
            className="order-history-item__image-placeholder"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="order-history-item__content">
        <div className="order-history-item__header">
          <div>
            <h3 className="order-history-item__title">
              {title || 'Producto no disponible'}
            </h3>
          </div>

          <span className="order-history-item__status">
            <span className="order-history-item__status-dot" aria-hidden="true" />
            {isPending ? 'En marcha' : 'Entregado'}
          </span>
        </div>

        <div className="order-history-item__details">
          {category?.title && <span>{category.title}</span>}
          {price != null && (
            <strong className="order-history-item__price">
              {formatPrice(price)}
            </strong>
          )}
        </div>

        <div className="order-history-item__time">
          <FaClock aria-hidden="true" />
          <span>{formatHour(order.created_at)}</span>
          <span className="order-history-item__separator" aria-hidden="true">
            ·
          </span>
          <span>{formatTimeAgo(order.created_at)}</span>
        </div>
      </div>
    </article>
  )
}

function formatPrice(price) {
  return `$${Number(price).toLocaleString('es-CO')}`
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
