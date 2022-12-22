import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosReq } from '@/requestHelper'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const userStore = useUserStore()

  const totalCartItems = computed(() => {
    return items.value.length
  })

  const restoreCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    if (cart) items.value = cart
  }

  const clearCart = () => {
    items.value = []
    sessionStorage.removeItem('cart')
  }

  const addToCart = (newItem) => {
    const parsedItem = {
      ...newItem,
      total_price: Math.round((newItem.price * newItem.quantity + Number.EPSILON) * 100) / 100,
    }
    items.value.push(parsedItem)
    sessionStorage.setItem('cart', JSON.stringify(items.value))
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

    clearCart()

    userStore.user.customer.points += response.data.order.points_gained

    return response.data.data
  }

  return {
    items,
    totalCartItems,
    restoreCart,
    clearCart,
    addToCart,
    removeFromCart,
    placeOrder,
  }
})
