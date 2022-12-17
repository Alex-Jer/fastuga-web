import axios from 'axios'
import { useUserStore } from './stores/user.js'

const API_URL = import.meta.env.VITE_API_DOMAIN

export const axiosReq = async (
  route,
  method = 'GET',
  formData = [],
  hasFiles = false
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': hasFiles
      ? 'multipart/form-data'
      : 'application/x-www-form-urlencoded',
  }
  const storedToken = sessionStorage.getItem('token')
  if (storedToken) headers.Authorization = `Bearer ${storedToken}`

  const url = `${API_URL}/${route}`

  let res = null
  switch (method.toUpperCase()) {
    case 'POST':
      res = await axios.post(url, formData, { headers })
      break
    case 'PUT':
    case 'PATCH':
      formData.append('_method', method.toUpperCase())
      res = await axios.post(url, formData, { headers })
      break
    case 'DELETE':
      res = await axios.delete(url, formData, { headers })
      break
    case 'GET':
    default:
      res = await axios.get(url, formData, { headers })
      break
  }

  if (res.status === 444 && storedToken) {
    // When the user was suppoused to be logged in, but is not. Then "logout".
    // Example: token revoked, token expired, blocked account, etc.
    const userStore = useUserStore()
    userStore.clearUser()
  }
  return res
}
