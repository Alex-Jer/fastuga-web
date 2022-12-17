import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

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

  async function loadProducts() {
    try {
      const response = await axios.get('products')
      products.value = response.data.data
      return products.value
    } catch (error) {
      clearProducts()
      throw error
    }
  }

  async function insertProduct(newProduct) {
    // Note that when an error occours, the exception should be
    // catch by the function that called the insertProduct
    const response = await axios.post('products', newProduct)
    products.value.push(response.data.data)
    return response.data.data
  }

  async function updateProduct(updatedProduct) {
    // Note that when an error occours, the exception should be
    // catch by the function that called the updateProduct
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

  async function deleteProduct(deletedProduct) {
    // Note that when an error occours, the exception should be
    // catch by the function that called the deleteProduct
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
