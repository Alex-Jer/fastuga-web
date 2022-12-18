import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq } from '@/requestHelper'

export const useProductsStore = defineStore('products', () => {
  // const userStore = useUserStore()

  const axios = inject('axios')

  const products = ref([])

  const totalProducts = computed(() => {
    return products.value.length
  })

  // const myInprogressProjects = computed(() => {
  //   return products.value.filter(
  //     (prj) => prj.status === 'W' && prj.responsible_id === userStore.userId
  //   )
  // })

  // const totalMyInprogressProjects = computed(() => {
  //   return myInprogressProjects.value.length
  // })

  // function getProductsByFilter(responsibleId, status) {
  //   return products.value.filter(
  //     (prod) =>
  //       (!responsibleId || responsibleId === prod.responsible_id) &&
  //       (!status || status === prod.status)
  //   )
  // }

  // function getProductsByFilterTotal(responsibleId, status) {
  //   return getProductsByFilter(responsibleId, status).length
  // }

  function clearProducts() {
    products.value = []
  }

  const loadProducts = async () => {
    try {
      const response = await axios.get('products')
      products.value = response.data.data
      return products.value
    } catch (error) {
      clearProducts()
      throw error
    }
  }

  const insertProduct = async (newProduct) => {
    const response = await axiosReq('products', 'POST', newProduct, true)
    products.value.push(response.data.product)
    return response.data.product
  }

  const updateProduct = async (updatedProduct) => {
    const response = await axios.put(
      `products/${updatedProduct.id}`,
      updatedProduct
    )
    const idx = products.value.findIndex((t) => t.id === response.data.data.id)
    if (idx >= 0) {
      products.value[idx] = response.data.data
    }
    return response.data.data
  }

  const deleteProduct = async (deletedProduct) => {
    const response = await axios.delete(`products/${deletedProduct.id}`)
    const idx = products.value.findIndex((t) => t.id === response.data.data.id)
    if (idx >= 0) {
      products.value.splice(idx, 1)
    }
    return response.data.data
  }

  return {
    products,
    totalProducts,
    // myInprogressProjects,
    // totalMyInprogressProjects,
    // getProductsByFilter,
    // getProductsByFilterTotal,
    loadProducts,
    clearProducts,
    insertProduct,
    updateProduct,
    deleteProduct,
  }
})
