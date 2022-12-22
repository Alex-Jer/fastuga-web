<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrderItemsTable from '@/components/orders/OrderItemsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
// const isModalActive = ref(false)
// const filterByType = ref('')
// const isFetching = ref(true)
const selectStatuses = ref([])

const loadPreparableDishes = async () => {
  console.log('entrei aqui')
  await ordersStore.loadPreparableDishes().catch((error) => {
    console.log(error)
    console.log(ordersStore.loadPreparableDishes())
  })
}

const loadStatuses = async () => {
  await ordersStore.loadStatuses().catch((error) => {
    console.log(error)
  })
}

const filteredOrders = computed(() => {
  // return ordersStore.getProductsByFilter(filterByType.value)
  console.log(ordersStore.orders)
  return ordersStore.orders
})

onMounted(async () => {
  // Calling loadProjects refreshes the list of projects from the API
  await loadPreparableDishes()
  await loadStatuses()
  // isFetching.value = false
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
      <order-items-table :orders="filteredOrders" :statuses="selectStatuses" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
