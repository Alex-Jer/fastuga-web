import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axiosReq } from '@/requestHelper'

export const useOrderItemsStore = defineStore('orders', () => {
  const items = ref([])
  const statuses = ref([])
  const pageInfo = ref([])

  const clearItems = () => {
    items.value = []
  }

  const clearStatuses = () => {
    statuses.value = []
  }

  const loadPreparableDishes = async () => {
    try {
      const response = await axiosReq('orders/preparable-dishes', 'GET')
      items.value = response.data
      return items.value
    } catch (error) {
      clearItems()
      throw error
    }
  }

  const prepareDish = async (order, item) => {
    const response = await axiosReq(`orders/${order}/dish/${item}/prepare`, 'PATCH')
    if (response.status !== 200) throw response
    const index = items.value.findIndex((itm) => itm.item.id === item)
    items.value[index].item.status = 'P'
    return response
  }

  const finishDish = async (order, item) => {
    const response = await axiosReq(`orders/${order}/dish/${item}/finish`, 'PATCH')
    if (response.status !== 200) throw response
    const index = items.value.findIndex((itm) => itm.item.id === order)
    items.value[index].item.status = 'R'
    items.value.splice(index, 1)
    return response
  }

  const loadDishStatuses = () => {
    statuses.value = [
      { id: 1, value: 'W', label: 'Waiting' },
      { id: 2, value: 'P', label: 'Preparing' },
      { id: 3, value: 'R', label: 'Ready' },
    ]
  }

  return {
    items,
    statuses,
    pageInfo,
    clearItems,
    clearStatuses,
    loadPreparableDishes,
    prepareDish,
    finishDish,
    loadDishStatuses,
  }
})
