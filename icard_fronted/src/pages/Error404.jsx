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
        <h2>Page not found</h2>

        <p>
          The page you are trying to open does not exist or has been moved.
        </p>

        <div className="error-404__actions">
          {/* <Link to="/">
            <Button variant="primary">
              Back to home
            </Button>
          </Link> */}

          <Link to="/admin">
            <Button variant="primary">
              Go to admin panel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}