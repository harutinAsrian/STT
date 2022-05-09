import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataSelector } from '../../redux/selectors/dataSelector'
import { getConfigureData } from '../../redux/slices/dataSlice'
import Modal from '../../../src/components/Modal'
import Button from '../../components/Button'

const Profile = () => {
  const { data } = useSelector(dataSelector)
  const [formState, setFormState] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      const initialFormState = data.reduce((prev, next) => {
        prev[next.id] = ""
        return prev
      }, {})
      setFormState(initialFormState)
    }
  }, [data])

  const validation = () => {
    for (let key in formState) {
      const inputValue = formState[key]

      const current = data.find(item => item.id === key)
      if (current) {
        if (current.details.required && !inputValue) return false
      }
    }
    return true
  }

  const handleSubmit = () => {
    if (validation()) setIsOpen(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    dispatch(getConfigureData())
  }, [])

  const filteredData = useMemo(() => {
    return data.filter(item => item.details.visible)
  }, [data])

  return (
    <div className="profile">
      {!!filteredData.length && filteredData.map(item => {
        const { id, type, details: { label, required, rows, visible } } = item
        return (
          <div className={`profile-row ${!visible && 'hide'}`} key={id}>
            <label htmlFor={id}>
              {label}
              {required && <span className="required">*</span>}
            </label>
            {type === 'text'
              ? <textarea
                onChange={handleChange}
                name={id}
                value={formState[id] || ""}
                rows={rows}
              >
              </textarea>
              : <input
                name={id}
                id={id}
                value={formState[id] || ""}
                onChange={handleChange}
              />}
          </div>
        )
      })}
      <div className="profile-submit">
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </div>
      {!!isOpen && <Modal onClose={() => setIsOpen(false)}>well done !</Modal> }
    </div>
  )
}

export default Profile