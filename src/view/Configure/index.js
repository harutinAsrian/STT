import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dataSelector } from '../../redux/selectors/dataSelector'
import { getConfigureData } from '../../redux/slices/dataSlice'
import Button from '../../components/Button'
import AddModal from '../../components/Modal/AddModal.js'
import RemoveModal from '../../components/Modal/RemoveModal'

const Configure = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector(dataSelector)
  const [isOpen, setIsOpen] = useState(false)
  const [removeItemId, setRemoveItemId] = useState(0)
  const [editItemId, setEditItemId] = useState(0)

  useEffect(() => {
    dispatch(getConfigureData())
  }, [])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const openRemoveModal = (id) => setRemoveItemId(id)
  const closeRemoveModal = () => setRemoveItemId(0)

  const openEditModal = (id) => setEditItemId(id)
  const closeEditModal = () => setEditItemId(0)

  return (<div className="configure">
    {!!isLoading && <div className="spinner">
      <span className="loader loader-quart"></span>
      Loading...
    </div>}
    <div className="configure-table">
      <div className="configure-table-header">
        <div className="configure-table__item">Label</div>
        <div className="configure-table__item">Type</div>
        <div className="configure-table__item">Action</div>
      </div>
      <div className="configure-table-body">
        {!!data.length && data.map((item, i) => {
          const { id, type, details } = item
          return (
            <div className="configure-table-body-row" key={id}>
              <div className="configure-table__item">{details.label}</div>
              <div className="configure-table__item">{type}</div>
              <div className="configure-table__item configure-table__item--actions">
                <Button onClick={() => openEditModal(id)}>edit</Button>
                <Button type="danger" onClick={() => openRemoveModal(id)}>delete</Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    <div className="configure-add" >
      <Button type="primary" onClick={openModal}>Add new field</Button>
    </div>
    {isOpen ? <AddModal onClose={closeModal} /> : false}
    {removeItemId ? <RemoveModal id={removeItemId} onClose={closeRemoveModal} /> : false}
    {editItemId ? <AddModal id={editItemId} data={data} onClose={closeEditModal} /> : false}
  </div>
  )
}

export default React.memo(Configure)