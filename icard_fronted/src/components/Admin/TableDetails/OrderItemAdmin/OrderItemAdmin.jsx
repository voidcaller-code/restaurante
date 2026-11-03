import { Button, Image } from 'react-bootstrap'
import { FaCheck, FaClock, FaUtensils } from 'react-icons/fa'

import { useOrder } from '../../../../hooks'
import { ORDER_STATUS } from '../../../../utils/constants'

import './OrderItemAdmin.scss'

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props

  const { checkDeliveredOrder } = useOrder()

  const { title, image, price, category_data: category } =
    order.product_data || {}

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id)
    onReloadOrders()
  }

  const statusClass = order.status?.toLowerCase() || ''
  const isPending = order.status === ORDER_STATUS.PENDING

  return (
    <article className={`order-item-admin order-item-admin--${statusClass}`}>
      <div className="order-item-admin__media">
        {image ? (
          <Image
            src={image}
            alt={title || 'Ordered product'}
            className="order-item-admin__image"
          />
        ) : (
          <FaUtensils className="order-item-admin__image-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="order-item-admin__content">
        <div className="order-item-admin__header">
          <div>
            <h3 className="order-item-admin__title">
              {title || 'Product unavailable'}
            </h3>
          </div>

          <span className="order-item-admin__status">
            <span className="order-item-admin__status-dot" aria-hidden="true" />
            {isPending ? 'Pending' : 'Delivered'}
          </span>
        </div>

        <div className="order-item-admin__details">
          {category?.title && <span>{category.title}</span>}
          {price != null && (
            <strong className="order-item-admin__price">
              {formatPrice(price)}
            </strong>
          )}
        </div>

        <div className="order-item-admin__footer">
          <div className="order-item-admin__time">
            <FaClock aria-hidden="true" />
            <span>{formatHour(order.created_at)}</span>
            <span className="order-item-admin__separator" aria-hidden="true">
              ·
            </span>
            <span>{formatTimeAgo(order.created_at)}</span>
          </div>

          {isPending && (
            <Button
              variant="success"
              size="sm"
              className="order-item-admin__action"
              onClick={onCheckDeliveredOrder}
            >
              <FaCheck aria-hidden="true" />
              Mark as delivered
            </Button>
          )}
        </div>
      </div>
    </article>
  )
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
