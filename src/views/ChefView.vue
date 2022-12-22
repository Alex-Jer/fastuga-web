<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrderItemsTable from '@/components/orders/OrderItemsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
const selectStatuses = ref([])

const loadPreparableDishes = async () => {
  await ordersStore.loadPreparableDishes().catch((error) => {
    console.log(error)
    console.log(ordersStore.loadPreparableDishes())
  })
}

const loadDishStatuses = async () => {
  await ordersStore.loadDishStatuses().catch((error) => {
    console.log(error)
  })
}

const filteredOrders = computed(() => {
  console.log(ordersStore.orders)
  return ordersStore.orders
})

const finishDish = async (order, item) => {
  await ordersStore.finishDish(order, item).catch((error) => {
    console.log(error)
  })
}

const prepareDish = async (order, item) => {
  await ordersStore.prepareDish(order, item).catch((error) => {
    console.log(error)
  })
}


onMounted(async () => {
  await loadPreparableDishes()
  await loadDishStatuses()
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
          <h1 class="text-3xl leading-tight">Current Dishes</h1>
        </div>
      </section>
      <order-items-table :order="filteredOrders" :statuses="selectStatuses" @readyEvent="finishDish" @prepareEvent="prepareDish" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
