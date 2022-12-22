import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq } from '@/requestHelper'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalCartItems = computed(() => {
    return items.value.length
  })

  const clearCart = () => {
    items.value = []
  }

  //! TODO: Destroy cart on logout
  const addToCart = (newItem) => {
    const parsedItem = {
      ...newItem,
      total_price: Math.round((newItem.price * newItem.quantity + Number.EPSILON) * 100) / 100,
    }
    items.value.push(parsedItem)
  }

  const removeFromCart = (removedItem) => {
    const index = items.value.findIndex((item) => item === removedItem)
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

    return response.data.data
  }

  return {
    items,
    totalCartItems,
    clearCart,
    addToCart,
    removeFromCart,
    placeOrder,
  }
})
