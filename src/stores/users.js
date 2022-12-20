import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { axiosReq } from '@/requestHelper'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const types = ref([])

  const totalUsers = computed(() => {
    return users.value.length
  })

  const getUsersByFilter = (type) => users.value.filter((user) => !type || type === user.type)

  const getUsersByFilterTotal = (type) => getUsersByFilter(type).length

  const clearUsers = () => {
    users.value = []
  }

  const clearTypes = () => {
    types.value = []
  }

  const loadUsers = async () => {
    try {
      const response = await axiosReq('users', 'GET')
      users.value = response.data.data
      return users.value
    } catch (error) {
      clearUsers()
      throw error
    }
  }

  const loadTypes = async () => {
    try {
      const response = await axiosReq('users/types', 'GET')
      types.value = response.data
      return types.value
    } catch (error) {
      clearTypes()
      throw error
    }
  }

  const insertUser = async (newUser) => {
    const response = await axiosReq('users', 'POST', newUser, true)
    users.value.push(response.data.user)
    return response.data.user
  }

  const updateUser = async (updatedUser) => {
    const response = await axiosReq(`users/${updatedUser.user_id}`, 'PUT', updatedUser, true)
    const index = users.value.findIndex((user) => user.user_id === updatedUser.user_id)
    users.value[index] = response.data.user
    return response
  }

  const deleteUser = async (deletedUser) => {
    const response = await axiosReq(`users/${deletedUser.user_id}`, 'DELETE')
    if (response.status !== 200) throw response
    users.value.splice(users.value.indexOf(deletedUser), 1)
    return response
  }

  return {
    users,
    types,
    totalUsers,
    getUsersByFilter,
    getUsersByFilterTotal,
    clearUsers,
    clearTypes,
    loadUsers,
    loadTypes,
    insertUser,
    updateUser,
    deleteUser,
  }
})