import React from 'react'
import { useDispatch } from 'react-redux'
import Modal from '.'
import { removeConfigureItem } from '../../redux/slices/dataSlice'

const RemoveModal = ({id, onClose}) => {
  const dispatch = useDispatch()
  const onSubmit = () => {
    dispatch(removeConfigureItem(id))
    onClose()
  }
  
  return (
    <Modal
      title="Confirm remove"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      Are you sure you want to delete this item?
    </Modal>
  )
}

export default RemoveModal