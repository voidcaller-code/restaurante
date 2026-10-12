import { Button, Modal } from 'react-bootstrap'
import './ModalConfirm.scss'

export function ModalConfirm(props) {
  const {
    title,
    message,
    show,
    onClose,
    onCancel = onClose,
    onCloseText = 'Cancelar',
    onCloseVariant = 'danger',
    onConfirm,
    onConfirmText = 'Aceptar',
    onConfirmVariant = 'success',
  } = props

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="sm"
      centered
      className="modal-confirm"
    >
      {title && (
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}

      {message && <Modal.Body>{message}</Modal.Body>}

      <Modal.Footer>
        <Button variant={onCloseVariant} onClick={onCancel}>
          {onCloseText}
        </Button>

        <Button variant={onConfirmVariant} onClick={onConfirm}>
          {onConfirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
