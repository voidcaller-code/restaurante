import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router'
import { MdTableRestaurant } from 'react-icons/md'

import { getOrdersByTableApi } from '../../../../api/orders'
import { ORDER_STATUS } from '../../../../utils/constants'
import { usePayment } from '../../../../hooks'

import './TableAdmin.scss'
// table.svg

export function TableAdmin(props) {
  const { table, reload } = props

  const [orders, setOrders] = useState([])
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

        setOrders(response || [])
      } catch (error) {
        console.error(error)
        setOrders([])
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

        setTableBusy(response?.length > 0)
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
    orders.length > 0 ? 'table-admin__icon--pending' : '',
    tableBusy ? 'table-admin__icon--busy' : '',
    pendingPayment ? 'table-admin__icon--pending-payment' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link className="table-admin" to={`/admin/tables/${table.id}`}>
      {orders.length > 0 && (
        <Badge bg="warning" text="dark" pill className="table-admin__badge">
          {orders.length}
        </Badge>
      )}

      {pendingPayment && (
        <Badge bg="success" pill className="table-admin__badge table-admin__badge--payment">
          Cuenta
        </Badge>
      )}

      <MdTableRestaurant className={iconClassName} />

      <p>Mesa {table.number}</p>
    </Link>
  )
}