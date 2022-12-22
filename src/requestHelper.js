import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useUserStore } from './stores/user.js'

const toast = useToast()

const API_URL = import.meta.env.VITE_API_DOMAIN

const checkForAuthError = (res, storedToken) => {
  if (res.status === 444 && storedToken) {
    // When the user was suppoused to be logged in, but is not. Then "logout".
    // Example: token revoked, token expired, blocked account, etc.
    const userStore = useUserStore()
    userStore.clearUser()
  }
}

export const axiosReq = async (route, method = 'GET', formData = [], hasFiles = false) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': hasFiles ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
  }
  const storedToken = sessionStorage.getItem('token')
  if (storedToken) headers.Authorization = `Bearer ${storedToken}`

  const url = `${API_URL}/api/${route}`

  let res = null
  switch (method.toUpperCase()) {
    case 'POST':
      res = await axios.post(url, formData, { headers })
      break
    case 'PUT':
      if (formData.length === 0 || formData === []) {
        res = await axios.put(url, formData, { headers })
        break
      }
      /* eslint-disable-next-line no-param-reassign */
      formData._method = method.toUpperCase()
      res = await axios.post(url, formData, { headers })
      break
    case 'PATCH':
      if (formData.length === 0 || formData === []) {
        res = await axios.patch(url, formData, { headers })
        break
      }
      /* eslint-disable-next-line no-param-reassign */
      formData._method = method.toUpperCase()
      res = await axios.post(url, formData, { headers })
      break
    case 'DELETE':
      res = await axios.delete(url, { headers }).catch((error) => {
        return error.response
      })
      break
    case 'GET':
    default:
      res = await axios.get(url, { headers })
      break
  }

  checkForAuthError(res, storedToken)

  return res
}

export const axiosReqPage = async (pageUrl) => {
  const headers = {
    Accept: 'application/json',
  }
  const storedToken = sessionStorage.getItem('token')
  if (storedToken) headers.Authorization = `Bearer ${storedToken}`

  const res = await axios.get(pageUrl, { headers })

  checkForAuthError(res, storedToken)

  return res
}

export const processGeneralError = (error, model) => {
  const actualError = error.response ? error.response : error
  if (!actualError.status) {
    toast.error("Couldn't connect to the server! Please try again later.")
    return
  }
  const capitalModel = model.charAt(0).toUpperCase() + model.slice(1)
  if (actualError.status === 404) toast.error(`${capitalModel} was not found!`)
  else if (actualError.data?.message) toast.error(actualError.data.message)
  else toast.error('An unknown server error has occurred!')
}
