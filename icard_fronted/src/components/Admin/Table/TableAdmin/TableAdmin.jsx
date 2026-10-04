import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router'
import { MdTableBar } from 'react-icons/md'

import { getOrdersByTableApi } from '../../../../api/orders'
import { ORDER_STATUS } from '../../../../utils/constants'
import { usePayment } from '../../../../hooks'

import './TableAdmin.scss'

export function TableAdmin(props) {
  const { table, reload } = props

  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)
  const [tableBusy, setTableBusy] = useState(false)
  const [pendingPayment, setPendingPayment] = useState(false)

  const { getPaymentByTable } = usePayment()

  useEffect(() => {
    const loadPendingOrders = async () => {
      try {
        const response = await getOrdersByTableApi(
          table.id,
          ORDER_STATUS.PENDING
        )

        setPendingOrdersCount(response?.retTotal ?? 0)
      } catch (error) {
        console.error(error)
        setPendingOrdersCount(0)
      }
    }

    loadPendingOrders()
  }, [table.id, reload])

  useEffect(() => {
    const loadDeliveredOrders = async () => {
      try {
        const response = await getOrdersByTableApi(
          table.id,
          ORDER_STATUS.DELIVERED
        )
        setTableBusy((response?.retTotal ?? 0) > 0)
      } catch (error) {
        console.error(error)
        setTableBusy(false)
      }
    }

    loadDeliveredOrders()
  }, [table.id, reload])

  useEffect(() => {
    const loadPayment = async () => {
      try {
        const response = await getPaymentByTable(table.id)

        setPendingPayment(response?.length > 0)
      } catch (error) {
        console.error(error)
        setPendingPayment(false)
      }
    }

    loadPayment()
  }, [table.id, reload])

  const iconClassName = [
    'table-admin__icon',
    pendingOrdersCount > 0 ? 'table-admin__icon--pending' : '',
    tableBusy ? 'table-admin__icon--busy' : '',
    pendingPayment ? 'table-admin__icon--pending-payment' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link className="table-admin" to={`/admin/tables/${table.id}`}>
      {pendingOrdersCount > 0 && (
        <Badge bg="warning" text="dark" pill className="table-admin__badge">
          {pendingOrdersCount}
        </Badge>
      )}

      {pendingPayment && (
        <Badge bg="success" pill className="table-admin__badge table-admin__badge--payment">
          Cuenta
        </Badge>
      )}

      <MdTableBar
        role="img"
        aria-label={`Mesa ${table.id}`}
        className={iconClassName}
      />

      <p>Mesa {table.id}</p>
    </Link>
  )
}
