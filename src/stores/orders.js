import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { axiosReq, axiosReqPage } from '@/requestHelper'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const statuses = ref([])
  const pageInfo = ref([])

  statuses.value = [
    { id: 1, value: 'P', label: 'Preparing' },
    { id: 2, value: 'R', label: 'Ready' },
    { id: 3, value: 'D', label: 'Delivered' },
    { id: 3, value: 'C', label: 'Cancelled' },
  ]

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
  const getPageInfo = () => pageInfo

  const loadOrders = async (route, page) => {
    try {
      const response = page ? await axiosReqPage(page) : await axiosReq(route, 'GET')
      orders.value = response.data.data
      pageInfo.value = response.data.meta
      return orders.value
    } catch (error) {
      clearOrders()
      throw error
    }
  }

  const loadMyOrders = async (page) => {
    await loadOrders('orders/me', page)
  }

  const loadAllOrders = async (page) => {
    await loadOrders('orders', page)
  }

  const loadPrepOrders = async () => {
    try {
      const res = await axiosReq('orders/ready', 'GET')
      const response = await axiosReq('orders/preparing', 'GET')
      const resFinal = res.data.data.concat(response.data.data)
      orders.value = resFinal
      return orders.value
    } catch (error) {
      clearOrders()
      throw error
    }
  }

  const loadReadyOrders = async () => {
    try {
      const response = await axiosReq('orders/ready', 'GET')
      orders.value = response.data.data
      return orders.value
    } catch (error) {
      clearOrders()
      throw error
    }
  }

  const finishOrder = async (order) => {
    const response = await axiosReq(`orders/${order}/finish`, 'PATCH')
    if (response.status !== 200) throw response
    const index = orders.value.findIndex((ord) => ord.order.id === order)
    orders.value[index].order.status = 'R'
    return response
  }

  const deliverOrder = async (order) => {
    const response = await axiosReq(`orders/${order}/deliver`, 'PATCH')
    const index = orders.value.findIndex((ord) => ord.order.id === order)
    orders.value[index].order.status = 'D'
    return response
  }

  const cancelOrder = async (orderId, reason) => {
    const response = await axiosReq(`orders/${orderId}/cancel`, 'PATCH', { reason })
    orders.value = orders.value.filter((order) => order.id !== orderId)
    return response.data.order
  }

  return {
    orders,
    statuses,
    totalOrders,
    pageInfo,
    getPageInfo,
    getOrdersByFilter,
    getOrdersByFilterTotal,
    clearOrders,
    clearStatuses,
    loadMyOrders,
    loadAllOrders,
    cancelOrder,
    loadPrepOrders,
    finishOrder,
    deliverOrder,
    loadReadyOrders,
  }
})
