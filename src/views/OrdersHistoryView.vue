<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrdersHistoryTable from '@/components/orders/OrdersHistoryTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
// const isModalActive = ref(false)
// const filterByType = ref('')
// const isFetching = ref(true)
const selectStatuses = ref([])

const loadOrders = async () => {
  await ordersStore.loadUserOrders().catch((error) => {
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
      <!-- <ProductModal
        v-if="!isFetching"
        v-model="isModalActive"
        title="Add a new product"
        :types="selectTypes"
        action="insert"
      /> -->

      <!-- Start of header -->
      <section class="mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <IconRounded :icon="mdiClipboardTextClockOutline" color="light" class="mr-3" bg />
          <h1 class="text-3xl leading-tight">Orders History</h1>
        </div>
      </section>
      <!-- End of header -->

      <!-- <products-table :products="filteredProducts" :types="selectTypes" /> -->
      <orders-history-table :orders="filteredOrders" :statuses="selectStatuses" />

      <!-- <div class="mx-2 mt-2" v-if="!isFetching">
        <label class="mr-3">Filter by type:</label>
        <select
          class="pl-3 pr-12 py-2 focus:ring focus:outline-none border-gray-700 rounded bg-slate-800"
          v-model="filterByType"
        >
          <option :value="null" />
          <option v-for="item in selectTypes" :key="item.id" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
