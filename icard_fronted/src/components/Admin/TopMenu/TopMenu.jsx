import { Button, Navbar } from 'react-bootstrap'
import { FaSignOutAlt } from 'react-icons/fa'

import { useAuth } from '../../../hooks'

import './TopMenu.scss'

export function TopMenu() {
  const { auth, logout } = useAuth()

  const renderName = () => {
    if (auth?.me?.retData?.first_name && auth?.me?.retData?.last_name) {
      return `${auth.me.retData.first_name} ${auth.me.retData.last_name}`
    }

    return auth?.me?.retData?.email || 'Administrador'
  }

  return (
    <Navbar fixed="top" className="top-menu-admin">
      <div className="top-menu-admin__logo">
        <p>iCard Admin</p>
      </div>

      <div className="top-menu-admin__right">
        <span>Hola, {renderName()}</span>

        <Button
          type="button"
          variant="outline-light"
          size="sm"
          onClick={logout}
        >
          <FaSignOutAlt />
        </Button>
      </div>
    </Navbar>
  )
}