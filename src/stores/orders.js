import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq, axiosReqPage } from '@/requestHelper'

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref([])
  const statuses = ref([])
  const pageInfo = ref([])

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
      const response = await axios.get('orders/preparing')
      orders.value = response.data.data
      return orders.value
    } catch (error) {
      clearOrders()
      throw error
    }
  }

  const loadPreparableDishes = async () => {
    try {
      const response = await axios.get('orders/preparable-dishes')
      orders.value = response.data
      return orders.value
    } catch (error) {
      clearOrders()
      throw error
    }
  }

  const prepareDish = async (order, item) => {
    const response = await axiosReq(`orders/${order}/dish/${item}/prepare`, 'PATCH')
    if (response.status !== 200) throw response
    orders.value.splice(orders.value.indexOf(item), 1)
    return response
  }

  const finishDish = async (order, item) => {
    const response = await axiosReq(`orders/${order}/dish/${item}/finish`, 'PATCH')
    if (response.status !== 200) throw response
    orders.value.splice(orders.value.indexOf(item), 1)
    return response
  }

  const orderReady = async (order) => {
    const response = await axiosReq(`orders/${order}/finish`, 'PATCH')
    if (response.status !== 200) throw response
    orders.value.splice(orders.value.indexOf(order), 1)
    return response
  }

  const deliverOrder = async (order) => {
    const response = await axiosReq(`orders/${order}/deliver`, 'PATCH')
    if (response.status !== 200) throw response
    orders.value.splice(orders.value.indexOf(order), 1)
    return response
  }

  const loadStatuses = async () => {
    statuses.value = [
      { id: 1, value: 'P', label: 'Preparing' },
      { id: 2, value: 'R', label: 'Ready' },
      { id: 3, value: 'D', label: 'Delivered' },
      { id: 3, value: 'C', label: 'Cancelled' },
    ]
  }

  const loadDishStatuses = async () => {
    statuses.value = [
      { id: 1, value: 'W', label: 'Waiting' },
      { id: 2, value: 'P', label: 'Preparing' },
      { id: 3, value: 'R', label: 'Ready' },
    ]
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
    loadStatuses,
    cancelOrder,
    loadPreparableDishes,
    prepareDish,
    finishDish,
    loadPrepOrders,
    orderReady,
    deliverOrder,
    loadDishStatuses,
  }
})
