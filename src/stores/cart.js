import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq } from '@/requestHelper'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalCartItems = computed(() => {
    return items.value.length
  })

  // const getProductsByFilter = (type) => cart.value.filter((prod) => !type || type === prod.type)

  // const getProductsByFilterTotal = (type) => getProductsByFilter(type).length

  const clearCart = () => {
    items.value = []
  }

  // const loadCart = async () => {
  //   try {
  //     const response = await axiosReq('products', 'GET')
  //     cart.value = response.data.data
  //     return cart.value
  //   } catch (error) {
  //     clearCart()
  //     throw error
  //   }
  // }

  //! TODO: Destroy cart on logout
  const addToCart = (newItem) => {
    items.value.push(newItem)
  }

  // const updateProduct = (updatedProduct) => {
  // }

  const removeFromCart = (removedItem) => {
    const index = items.value.findIndex((item) => item.product_id === removedItem.product_id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const placeOrder = async (order) => {
    const cartItems = items.value.map((item) => {
      return {
        id: item.product_id,
        quantity: item.quantity || 1,
        notes: item.notes || '',
      }
    })

    const response = await axiosReq('orders', 'POST', {
      payment_type: order.payment_type,
      payment_reference: order.payment_reference,
      points_used: order.points_used,
      cart: JSON.stringify(cartItems),
    })
    console.log(response)
  }

  return {
    items,
    totalCartItems,
    clearCart,
    // loadCart,
    addToCart,
    removeFromCart,
    placeOrder,
  }
})
