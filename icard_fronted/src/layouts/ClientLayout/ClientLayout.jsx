import { useEffect } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router'
import { Button, Container } from 'react-bootstrap'
import { useTable } from '../../hooks'
import './ClientLayout.scss'
import { FaShoppingCart, FaListAlt, FaSignOutAlt } from 'react-icons/fa'

export function ClientLayout() {
  const { idTable } = useParams()
  const navigate = useNavigate()
  const { isExistTable } = useTable()

  useEffect(() => {
    const validateTable = async () => {
      const exist = await isExistTable(idTable)
      if (!exist) navigate('/', { replace: true })
    }

    validateTable()
  }, [idTable, isExistTable, navigate])

  const closeTable = () => {
    navigate('/')
  }

  const goToCart = () => {
    navigate(`/client/${idTable}/cart`)
  }

  const goToOrders = () => {
    navigate(`/client/${idTable}/orders`)
  }

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${idTable || ''}`} className="client-layout__logo">
            <h1>iCard</h1>
          </Link>

          <span>
            {idTable ? `Table ${idTable}` : 'Restaurant'}
          </span>
          
          <div className="client-layout__actions">
            <Button variant="outline-primary" size="sm" onClick={goToCart}>
              <FaShoppingCart />
            </Button>

            <Button variant="outline-secondary" size="sm" onClick={goToOrders}>
              <FaListAlt />
            </Button>

            <Button variant="outline-danger" size="sm" onClick={closeTable}>
              <FaSignOutAlt /> Exit
            </Button>
          </div>
        </div>

        <div className="client-layout__content">
          <Outlet />
        </div>
      </Container>
    </div>
  )
}