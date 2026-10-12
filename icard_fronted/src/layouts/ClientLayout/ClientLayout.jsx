import { useEffect } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router'
import { Button, Container } from 'react-bootstrap'
import './ClientLayout.scss'
import { FaShoppingCart, FaListAlt, FaSignOutAlt } from 'react-icons/fa'

export function ClientLayout() {
  const { tableNumber } = useParams()
  const navigate = useNavigate()

 
  const { isExistTable } = useTable()

  useEffect(() => {
    
    const validateTable = async () => {
      const exist = await isExistTable(tableNumber)
      if (!exist) closeTable()
    }
        validateTable()
  }, [tableNumber])

  const closeTable = () => {
    navigate('/')
  }

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`)
  }

  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`)
  }

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber || ''}`} className="client-layout__logo">
            <h1>iCard</h1>
          </Link>

          <span>
            {tableNumber ? `Mesa ${tableNumber}` : 'Restaurante'}
          </span>
          
          <div className="client-layout__actions">
            <Button variant="outline-primary" size="sm" onClick={goToCart}>
              <FaShoppingCart />
            </Button>

            <Button variant="outline-secondary" size="sm" onClick={goToOrders}>
              <FaListAlt />
            </Button>

            <Button variant="outline-danger" size="sm" onClick={closeTable}>
              <FaSignOutAlt /> Salir
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