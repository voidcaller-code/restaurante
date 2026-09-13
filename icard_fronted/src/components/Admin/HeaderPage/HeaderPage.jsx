import { Button } from 'react-bootstrap'
import './HeaderPage.scss'

export function HeaderPage(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props

  return (
    <div className="header-page-admin">
      <h2>{title}</h2>

      <div className="header-page-admin__actions">
        {btnTitle && (
          <Button variant="success" onClick={btnClick}>
            {btnTitle}
          </Button>
        )}

        {btnTitleTwo && (
          <Button variant="danger" onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  )
}