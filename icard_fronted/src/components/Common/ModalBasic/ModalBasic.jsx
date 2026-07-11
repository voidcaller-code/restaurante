import { Modal } from 'react-bootstrap'
import './ModalBasic.scss'

export function ModalBasic(props) {
  const { show, size = 'sm', title, children, onClose } = props

  const bootstrapSize = {
    tiny: 'sm',
    small: 'sm',
    large: 'lg',
    fullscreen: 'fullscreen',
  }[size] || size

  return (
    <Modal
      show={show}
      onHide={onClose}
      size={bootstrapSize}
      centered
      className="modal-basic"
    >
      {title && <Modal.Header closeButton>{title}</Modal.Header>}

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}