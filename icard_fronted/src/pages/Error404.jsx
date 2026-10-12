import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa'

import './Error404.scss'

export function Error404() {
  return (
    <div className="error-404">
      <div className="error-404__content">
        <FaExclamationTriangle className="error-404__icon" />

        <h1>404</h1>
        <h2>Página no encontrada</h2>

        <p>
          La página que estás intentando abrir no existe o fue movida.
        </p>

        <div className="error-404__actions">
          {/* <Link to="/">
            <Button variant="primary">
              Volver al inicio
            </Button>
          </Link> */}

          <Link to="/admin">
            <Button variant="primary">
              Ir al panel admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}