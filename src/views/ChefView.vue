<script setup>
import { mdiClipboardListOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import ProductsTable from '@/components/products/ProductsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
const selectStatuses = ref([])

const loadPreperableDishes = async () => {
  await ordersStore.loadUserOrders().catch((error) => {
    console.log(error)
  })
}


const filteredOrders = computed(() => {
  // return ordersStore.getProductsByFilter(filterByType.value)
  return ordersStore.orders
})

onMounted(async () => {
  // Calling loadProjects refreshes the list of projects from the API
  await loadPreperableDishes()
 
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiClipboardListOutline" title="Menu" main />
      <orders-history-table :orders="loadPreperableDishes" :statuses="selectStatuses" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
