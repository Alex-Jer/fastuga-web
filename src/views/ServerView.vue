<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrdersPrepTable from '@/components/orders/OrdersPrepTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
const selectStatuses = ref([])

const loadOrders = async () => {
  await ordersStore.loadPrepOrders().catch((error) => {
    processGeneralError(error, 'orders')
  })
}

const loadStatuses = () => {
  ordersStore.statuses
}

const filteredOrders = computed(() => {
  console.log(ordersStore.orders)
  return ordersStore.orders
})

const finishOrder = async (order) => {
  await ordersStore.finishOrder(order)
    .then(() => {
      toast.success('Order ready')
    })
    .catch((error) => {
      processGeneralError(error, 'order')
    })
}

const deliverOrder = async (order) => {
  await ordersStore.deliverOrder(order)
    .then(() => {
      toast.success('Order delivered')
    })
    .catch((error) => {
      processGeneralError(error, 'order')
    })
}

onMounted(async () => {
  await loadOrders()
  ordersStore.statuses.forEach((status, index) => {
    selectStatuses.value.push({
      id: index + 1,
      value: status.value,
      label: status.label,
    })
  })
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <section class="mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <IconRounded :icon="mdiClipboardTextClockOutline" color="light" class="mr-3" bg />
          <h1 class="text-3xl leading-tight">Current Orders</h1>
        </div>
      </section>
      <OrdersPrepTable :orders="filteredOrders" :statuses="selectStatuses" @readyEvent="finishOrder" @deliverEvent="deliverOrder" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
