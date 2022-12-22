import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { axiosReq, axiosReqPage } from '@/requestHelper'
import { useSocketStore } from './socket'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const types = ref([])
  const pageInfo = ref([])
  const socket = useSocketStore()

  const totalUsers = computed(() => {
    return users.value.length
  })

  const getUsersByFilter = (type) => users.value.filter((user) => !type || type === user.type)

  const getUsersByFilterTotal = (type) => getUsersByFilter(type).length

  const getPageInfo = () => pageInfo

  const clearUsers = () => {
    users.value = []
  }

  const clearTypes = () => {
    types.value = []
  }

  const loadUsers = async (page) => {
    try {
      const response = page ? await axiosReqPage(page) : await axiosReq('users', 'GET')
      users.value = response.data.data
      pageInfo.value = response.data.meta
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
    socket.sendUserUpdated(response.data.user)
    return response
  }

  const deleteUser = async (deletedUser) => {
    const response = await axiosReq(`users/${deletedUser.user_id}`, 'DELETE')
    if (response.status !== 200) throw response
    users.value.splice(users.value.indexOf(deletedUser), 1)
    return response
  }

  const blockUser = async (blockedUserId) => {
    const response = await axiosReq(`users/${blockedUserId}/block`, 'PATCH')
    if (response.status !== 200) throw response
    const index = users.value.findIndex((user) => user.user_id === blockedUserId)
    users.value[index].blocked = true
    socket.sendSessionLost(users.value[index])
    return response
  }

  const unblockUser = async (unblockedUserId) => {
    const response = await axiosReq(`users/${unblockedUserId}/unblock`, 'PATCH')
    if (response.status !== 200) throw response
    const index = users.value.findIndex((user) => user.user_id === unblockedUserId)
    users.value[index].blocked = false
    return response
  }

  return {
    users,
    types,
    pageInfo,
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
    blockUser,
    unblockUser,
    getPageInfo,
  }
})
