import { inject } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useSocketStore = defineStore('socket', () => {
  const socket = inject('socket')
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
    if (user) socket.emit('sessionLost', user.user_id, user.type)
  }

  const sendUserUpdated = (oldType, user) => {
    socket.emit('updateUser', oldType, user)
  }

  socket.on('orderDishesReady', (order) => {
    toast.info(`All hot dishes for order (#${order.ticket_number}) have been prepared!`)
  })

  socket.on('hotDishOrdered', (name) => {
    toast.info(`A ${name}) is waiting to be prepared`)
  })

  socket.on('orderReady', (order) => {
    toast.info(`Your order (#${order}) is ready!`)
  })

  return {
    socket,
    sendHotDishOrdered,
    sendOrderDishesReady,
    sendOrderReady,
    sendLoggedIn,
    sendSessionLost,
    sendUserUpdated,
  }
})
