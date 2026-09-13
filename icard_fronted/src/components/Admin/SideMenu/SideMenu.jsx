import { NavLink } from 'react-router'
import { Nav } from 'react-bootstrap'
import {
  FaFolder,
  FaHistory,
  FaHome,
  FaShoppingCart,
  FaTable,
  FaUsers,
} from 'react-icons/fa'

import { useAuth } from '../../../hooks'

import './SideMenu.scss'

export function SideMenu({ children }) {
  return (
    <div className="side-menu-admin">
      <MenuLeft />

      <main className="side-menu-admin__content">
        {children}
      </main>
    </div>
  )
}

function MenuLeft() {
  const { auth } = useAuth()

  return (
    <aside className="side-menu-admin__side">
      <Nav className="flex-column side-menu-admin__nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? 'side-menu-admin__link side-menu-admin__link--active'
              : 'side-menu-admin__link'
          }
        >
          <FaHome />
          <span>Pedidos</span>
        </NavLink>

        <NavLink
          to="/admin/tables"
          className={({ isActive }) =>
            isActive
              ? 'side-menu-admin__link side-menu-admin__link--active'
              : 'side-menu-admin__link'
          }
        >
          <FaTable />
          <span>Mesas</span>
        </NavLink>

        <NavLink
          to="/admin/payments-history"
          className={({ isActive }) =>
            isActive
              ? 'side-menu-admin__link side-menu-admin__link--active'
              : 'side-menu-admin__link'
          }
        >
          <FaHistory />
          <span>Historial de pagos</span>
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive
              ? 'side-menu-admin__link side-menu-admin__link--active'
              : 'side-menu-admin__link'
          }
        >
          <FaFolder />
          <span>Categorías</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? 'side-menu-admin__link side-menu-admin__link--active'
              : 'side-menu-admin__link'
          }
        >
          <FaShoppingCart />
          <span>Productos</span>
        </NavLink>

        {auth?.me?.retData?.is_staff && (
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? 'side-menu-admin__link side-menu-admin__link--active'
                : 'side-menu-admin__link'
            }
          >
            <FaUsers />
            <span>Usuarios</span>
          </NavLink>
        )}
      </Nav>
    </aside>
  )
}