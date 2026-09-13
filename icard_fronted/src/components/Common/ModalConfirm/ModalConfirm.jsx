import { Button, Modal } from 'react-bootstrap'
import './ModalConfirm.scss'

export function ModalConfirm(props) {
  const {
    title,
    show,
    onClose,
    onCloseText = 'Cancelar',
    onConfirm,
    onConfirmText = 'Aceptar',
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

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          {onCloseText}
        </Button>

        <Button variant="success" onClick={onConfirm}>
          {onConfirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}