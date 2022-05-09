import { createPortal } from 'react-dom'
import usePortal from '../../hooks/usePortal'
import Button from '../Button'

const Modal = ({ title, onClose, onSubmit, children }) => {
  const target = usePortal("modal-root")

  return createPortal(
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-title">{title}</div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Button onClick={onClose}>cancel</Button>
          <Button type="primary" onClick={onSubmit}>ok</Button>
        </div>
      </div>
    </>,
    target)
}

export default Modal