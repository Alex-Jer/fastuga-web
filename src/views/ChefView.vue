<script setup>
import { mdiClipboardListOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import OrderItemsTable from '@/components/orders/OrderItemsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()

const loadPreparableDishes = async () => {
  await ordersStore.loadPreparableDishes().catch((error) => {
    console.log(error)
  })
}


const filteredOrders = computed(() => {
  // return ordersStore.getProductsByFilter(filterByType.value)
  console.log(ordersStore.orders)
  return ordersStore.getOrdersByFilter('')
})

onMounted(async () => {
  // Calling loadProjects refreshes the list of projects from the API
  await loadPreparableDishes()
 
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiClipboardListOutline" title="Menu" main />
      <order-items-table :orders="filteredOrders"  />
    </SectionMain>
  </LayoutAuthenticated>
</template>
