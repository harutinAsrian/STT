import { BASE_URL } from '../config'
import axios from 'axios'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'content-type': 'application/json' }
});

export default instance