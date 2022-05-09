import axios from "./axios"

export const getData = async () => {
  try {
    const response = await axios('/data')
    return response.data
  } catch (e) {
    throw e.message
  }
}

export const removeItem = async (id) => {
  try {
    return await axios.delete(`/data/${id}`)
  } catch (e) {
    throw e.message
  }
}

export const addItem = async (data) => {
  try {
    const response = await axios.post(`/data`, data)
    return response.data
  } catch (e) {
    throw e.message
  }
}

export const updateItem = async (id, data) => {
  try {
    const response = await axios.put(`/data/${id}`, data)
    return response.data
  } catch (e) {
    throw e.message
  }
}
