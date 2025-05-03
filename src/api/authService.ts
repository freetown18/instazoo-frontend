import axios from 'axios'
import { API_URL } from '../config'

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/auth/signin`, {
    username,
    password
  })
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}