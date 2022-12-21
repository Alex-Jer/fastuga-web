import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq } from '@/requestHelper'

export const useUserStore = defineStore('user', () => {
  const apiDomain = inject('apiDomain')
  const axios = inject('axios')

  const user = ref(null)
  const paymentTypes = ref([])

  const userPhotoUrl = computed(() => {
    const nameWithPlus = user.value?.name.replace(/ /g, '+')
    const placeholder = `https://avatar.oxro.io/avatar.svg?name=${nameWithPlus}&bold=true&width=150&height=150&fontSize=50&background=3b82f6&color=ffffff`
    return user.value?.photo_url ? `${apiDomain}/storage/fotos/${user.value?.photo_url}` : placeholder
  })

  const userId = computed(() => {
    return user.value?.id ?? -1
  })

  const clearUser = () => {
    delete axios.defaults.headers.common.Authorization
    sessionStorage.removeItem('token')
    user.value = null
  }

  const clearPaymentTypes = () => {
    paymentTypes.value = []
  }

  const loadUser = async () => {
    try {
      const response = await axiosReq('users/me', 'GET')
      user.value = response.data.data
    } catch (error) {
      clearUser()
      throw error
    }
  }

  const loadPaymentTypes = async () => {
    paymentTypes.value = ['PAYPAL', 'MBWAY', 'VISA']
    // try {
    //   const response = await axiosReq('users/types', 'GET')
    //   types.value = response.data
    //   return types.value
    // } catch (error) {
    //   clearTypes()
    //   throw error
    // }
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post('login', credentials)
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
      sessionStorage.setItem('token', response.data.access_token)
      await loadUser()
      return true
    } catch (error) {
      clearUser()
      return false
    }
  }

  const register = async (newCustomer) => {
    try {
      await axiosReq('customers', 'POST', newCustomer, true)
      const response = await login(newCustomer)
      console.log(response.data)
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
      sessionStorage.setItem('token', response.data.access_token)
      await loadUser()
      return true
    } catch (error) {
      clearUser()
      return false
    }
  }

  const logout = async () => {
    try {
      await axios.delete('logout')
      clearUser()
      return true
    } catch (error) {
      return false
    }
  }

  const restoreToken = async () => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`
      await loadUser()
      return true
    }
    clearUser()
    return false
  }

  const updateDetails = async (updatedUser) => {
    const response = await axiosReq('customers/me', 'PUT', updatedUser)
    // const index = users.value.findIndex((user) => user.user_id === updatedUser.user_id)
    // users.value[index] = response.data.user
    return response
  }

  const updateEmail = async (updatedEmail) => {
    const response = await axiosReq('users/me/email', 'PATCH', updatedEmail)
    // const index = users.value.findIndex((user) => user.user_id === updatedUser.user_id)
    // users.value[index] = response.data.user
    return response
  }

  const updatePassword = async (updatedPassword) => {
    const response = await axiosReq('users/me/password', 'PATCH', updatedPassword)
    // const index = users.value.findIndex((user) => user.user_id === updatedUser.user_id)
    // users.value[index] = response.data.user
    return response
  }

  return {
    user,
    userId,
    paymentTypes,
    userPhotoUrl,
    clearPaymentTypes,
    loadPaymentTypes,
    login,
    register,
    logout,
    restoreToken,
    updateDetails,
    updateEmail,
    updatePassword,
  }
})
