import { inject } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useUserStore } from './user'

export const useSocketStore = defineStore('socket', () => {
  const socket = inject('socket')
  const userStore = useUserStore()
  const toast = useToast()

  const sendHotDishOrdered = (dish) => {
    socket.emit('hotDishOrdered', dish)
  }

  const sendOrderDishesReady = (order) => {
    socket.emit('orderDishesReady', order)
  }

  const sendOrderReady = (userId, order) => {
    socket.emit('orderReady', userId, order)
  }

  const sendLoggedIn = (user) => {
    socket.emit('loggedIn', user.user_id, user.type)
  }

  const sendSessionLost = (user) => {
    socket.emit('sessionLost', user.user_id, user.type)
  }

  const sendUserUpdated = (oldType, user) => {
    socket.emit('updateUser', oldType, user)
  }

  socket.on('updateUser', (user) => {
    const oldUser = userStore.user.value
    userStore.user.value = user
    if (oldUser.type !== user.type) {
      toast.info('Your user was remotely updated. Updating page...')
    }
  })

  socket.on('orderReady', (order) => {
    toast.info(`Your order (#${order.ticket_number}) is ready!`)
  })

  socket.on('orderDishesReady', (order) => {
    toast.info(`All hot dishes for order (#${order.ticket_number}) have been prepared!`)
  })

  socket.on('hotDishOrdered', (dish) => {
    toast.info(`A ${dish.product.name}) is waiting to be prepared`)
  })

  return {
    sendHotDishOrdered,
    sendOrderDishesReady,
    sendOrderReady,
    sendLoggedIn,
    sendSessionLost,
    sendUserUpdated,
  }
})
