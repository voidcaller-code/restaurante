import { NavLink } from 'react-router'
import { Nav } from 'react-bootstrap'
import {
  FaFolder,
  FaBoxes,
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
          <span>Orders</span>
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
          <span>Tables</span>
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
          <span>Payment history</span>
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
          <span>Categories</span>
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
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            isActive
              ? 'side-menu-admin__link side-menu-admin__link--active'
              : 'side-menu-admin__link'
          }
        >
          <FaBoxes />
          <span>Inventory</span>
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
            <span>Users</span>
          </NavLink>
        )}
      </Nav>
    </aside>
  )
}
