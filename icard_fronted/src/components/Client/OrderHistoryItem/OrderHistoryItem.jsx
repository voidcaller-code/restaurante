import { Image } from 'react-bootstrap'
import { FaClock, FaUtensils } from 'react-icons/fa'

import { ORDER_STATUS } from '../../../utils/constants'

import './OrderHistoryItem.scss'

const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
}

export function OrderHistoryItem(props) {
  const { order } = props

  const { title, image, price, category_data: category } =
    order.product_data || {}

  const status = order.status?.toLowerCase() || ''

  return (
    <article className={`order-history-item order-history-item--${status}`}>
      <div className="order-history-item__media">
        {image ? (
          <Image
            src={image}
            alt={title || 'Ordered product'}
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
              {title || 'Product unavailable'}
            </h3>
          </div>

          <span className="order-history-item__status">
            <span className="order-history-item__status-dot" aria-hidden="true" />
            {getStatusLabel(status)}
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

function getStatusLabel(status) {
  return ORDER_STATUS_LABELS[status] || 'No status'
}

function formatPrice(price) {
  return `$${Number(price).toLocaleString('en-US')}`
}

function formatHour(date) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-US', {
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

  if (diffMinutes < 1) return 'a few seconds ago'
  if (diffMinutes < 60) return `${diffMinutes} min ago`
  if (diffHours < 24) return `${diffHours} h ago`

  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}
