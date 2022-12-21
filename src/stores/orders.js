import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq } from '@/requestHelper'

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref([])
  const statuses = ref([])

  const totalOrders = computed(() => {
    return orders.value.length
  })

  const getOrdersByFilter = (status) => orders.value.filter((prod) => !status || status === prod.type)

  const getOrdersByFilterTotal = (status) => getOrdersByFilter(status).length

  const clearOrders = () => {
    orders.value = []
  }

  const clearStatuses = () => {
    statuses.value = []
  }

  const loadUserOrders = async () => {
    try {
      const response = await axios.get('orders/me')
      orders.value = response.data.data
      return orders.value
    } catch (error) {
      clearOrders()
      throw error
    }
  }

  const loadStatuses = async () => {
    statuses.value = [
      { id: 1, value: 'P', label: 'Preparing' },
      { id: 2, value: 'R', label: 'Ready' },
      { id: 3, value: 'D', label: 'Delivered' },
      { id: 3, value: 'C', label: 'Cancelled' },
    ]
  }

  const insertOrder = async (newOrder) => {
    const response = await axiosReq('orders', 'POST', newOrder, true)
    orders.value.push(response.data.order)
    return response.data.order
  }

  const updateOrder = async (updatedOrder) => {
    const response = await axiosReq(`orders/${updatedOrder.order_id}`, 'PUT', updatedOrder, true)
    const index = orders.value.findIndex((order) => order.order_id === updatedOrder.order_id)
    orders.value[index] = response.data.order
    return response
  }

  const deleteOrder = async (deletedOrder) => {
    const response = await axiosReq(`orders/${deletedOrder.order_id}`, 'DELETE')
    if (response.status !== 200) throw response
    orders.value.splice(orders.value.indexOf(deletedOrder), 1)
    return response
  }

  return {
    orders,
    statuses,
    totalOrders,
    // myInprogressProjects,
    // totalMyInprogressProjects,
    getOrdersByFilter,
    getOrdersByFilterTotal,
    clearOrders,
    clearStatuses,
    loadUserOrders,
    loadStatuses,
    insertOrder,
    updateOrder,
    deleteOrder,
  }
})
