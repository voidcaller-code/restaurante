import { useState } from 'react'
import { NavLink } from 'react-router'
import { Modal, Nav } from 'react-bootstrap'

import {
  FaFolder,
  FaHistory,
  FaHome,
  FaRobot,
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
  const [showAssistant, setShowAssistant] = useState(false)

  const getLinkClassName = ({ isActive }) =>
    isActive
      ? 'side-menu-admin__link side-menu-admin__link--active'
      : 'side-menu-admin__link'

  return (
    <>
      <aside className="side-menu-admin__side">
        <Nav className="flex-column side-menu-admin__nav">
          <NavLink
            to="/admin"
            end
            className={getLinkClassName}
          >
            <FaHome />
            <span>Pedidos</span>
          </NavLink>

          <NavLink
            to="/admin/tables"
            className={getLinkClassName}
          >
            <FaTable />
            <span>Mesas</span>
          </NavLink>

          <NavLink
            to="/admin/payments-history"
            className={getLinkClassName}
          >
            <FaHistory />
            <span>Historial de pagos</span>
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={getLinkClassName}
          >
            <FaFolder />
            <span>Categorías</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={getLinkClassName}
          >
            <FaShoppingCart />
            <span>Productos</span>
          </NavLink>

          {auth?.me?.retData?.is_staff && (
            <NavLink
              to="/admin/users"
              className={getLinkClassName}
            >
              <FaUsers />
              <span>Usuarios</span>
            </NavLink>
          )}
        </Nav>

        <button
          type="button"
          className="side-menu-admin__assistant-button"
          onClick={() => setShowAssistant(true)}
        >
          <FaRobot />
          <span>Asistente ANA</span>
        </button>
      </aside>

      <Modal
        show={showAssistant}
        onHide={() => setShowAssistant(false)}
        centered
        size="lg"
        dialogClassName="ana-assistant-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaRobot className="me-2" />
            Asistente ANA
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <iframe
            className="ana-assistant-modal__iframe"
            title="Asistente virtual ANA"
            src="https://www.gptbots.ai/widget/eehanrsodpqrulotsmfqoda/chat.html"
            allow="microphone *; camera *; display-capture *"
          />
        </Modal.Body>
      </Modal>
    </>
  )
}