import { useState, useEffect } from 'react'
import { createConfigureItem, updateConfigureItem } from '../../redux/slices/dataSlice'
import uuid from 'react-uuid'
import Modal from '.'
import { useDispatch } from 'react-redux'

const AddModal = ({ id = 0, data = [], onClose }) => {
  const [formState, setFormState] = useState({
    type: "name",
    details: {
      label: "",
      required: false,
      visible: false,
      rows: 1
    }
  })

  const selectedItem = data.length && data.find(item => item.id === id)
  const dispatch = useDispatch()

  useEffect(() => {
    if(selectedItem) setFormState(selectedItem)
  }, [selectedItem])
  
  const handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target

    if(name === 'visible' && value === false) {
      setFormState(prev => ({ ...prev, details: { ...prev.details, required: false}}))
    } 

    name === 'type'
    ? setFormState(prev => ({ ...prev, id: uuid(), [name]: value }))
    : setFormState(prev => ({ ...prev, id: uuid(), details: { ...prev.details, [name]: value }}))
  }

  const labelValidation = () => {
    return formState.details.label.length > 0
  }

  const handleSubmit = () => {
    if (!labelValidation()) return

    if (id) {
      dispatch(updateConfigureItem({ id, data: formState }))
    } else {
      dispatch(createConfigureItem(formState))
    }
    onClose()
  }

  return (
    <Modal
      title={`${id ? "edit" : "Add new field"}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="modal-body__input">
        <label htmlFor="label">Label:<span className="required">*</span></label>
        <input
          id="label"
          type="text"
          name="label"
          value={formState.details.label || ''}
          required
          onChange={handleChange}
        />
      </div>
      <div className="modal-body__input">
        <label htmlFor="type">type:</label>
        <select id="type" defaultValue="name" name="type" onChange={handleChange}>
          <option value="name">name</option>
          <option value="text">text</option>
          <option value="link">link</option>
        </select>
      </div>
      <div className="modal-body__input">
        <label htmlFor="required">required:</label>
        <div className="toggle" >
          <div className="row press">
            <input
              type="checkbox"
              id="unchecked1"
              className="cbx hidden"
              name="required"
              checked={formState.details.required}
              onChange={handleChange}
            />
            <label htmlFor="unchecked1" className="lbl"></label>
          </div>
        </div>
      </div>
      <div className="modal-body__input">
        <label htmlFor="visible">visible:</label>
        <div className="toggle" >
          <div className="row press">
            <input
              type="checkbox"
              id="unchecked"
              className="cbx hidden"
              name="visible"
              checked={formState.details.visible}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="unchecked" className="lbl"></label>
          </div>
        </div>
      </div>
      {formState.type === 'text' && <div className="modal-body__input">
        <label htmlFor="rows">rows:</label>
        <input
          id="rows"
          type="number"
          name="rows"
          value={formState.details.rows}
          onChange={(e) => handleChange(e)}
        />
      </div>}
    </Modal>
  )
}

export default AddModal