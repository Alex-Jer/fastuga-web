import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axiosReq } from '@/requestHelper'

export const useStatisticsStore = defineStore('statistics', () => {
  const statistics = ref(null)

  const clearStatistics = () => {
    statistics.value = null
  }

  const loadStatistics = async () => {
    try {
      const response = await axiosReq('statistics', 'GET')
      statistics.value = response.data.data
    } catch (error) {
      clearStatistics()
      throw error
    }
  }

  return {
    statistics,
    loadStatistics,
  }
})
