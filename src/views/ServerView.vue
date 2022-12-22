<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrdersPrepTable from '@/components/orders/OrdersPrepTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
// const isModalActive = ref(false)
// const filterByType = ref('')
// const isFetching = ref(true)
const selectStatuses = ref([])

const loadOrders = async () => {
  await ordersStore.loadPrepOrders().catch((error) => {
    console.log(error)
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
  await loadOrders()
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
          <h1 class="text-3xl leading-tight">Current Orders</h1>
        </div>
      </section>
      <orders-prep-table :orders="filteredOrders" :statuses="selectStatuses" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
