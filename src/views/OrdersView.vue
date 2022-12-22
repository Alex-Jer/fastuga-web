<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrdersTable from '@/components/orders/OrdersTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const ordersStore = useOrdersStore()
// const isModalActive = ref(false)
// const filterByType = ref('')
// const isFetching = ref(true)
const selectStatuses = ref([])

const loadMyOrders = async () => {
  await ordersStore.loadMyOrders().catch((error) => {
    console.log(error)
  })
}

const loadAllOrders = async () => {
  await ordersStore.loadAllOrders().catch((error) => {
    console.log(error)
  })
}

const filteredOrders = computed(() => ordersStore.orders)

const pageInfo = computed(() => ordersStore.getPageInfo())

const changePage = async (page) => {
  if (userStore.user.type === 'C') await ordersStore.loadMyOrders(page)
  else await ordersStore.loadAllOrders(page)
}

onMounted(async () => {
  if (userStore.user.type === 'C') await loadMyOrders()
  else await loadAllOrders()
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
      <!-- Start of header -->
      <section class="mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <IconRounded :icon="mdiClipboardTextClockOutline" color="light" class="mr-3" bg />
          <h1 class="text-3xl leading-tight">Orders {{ userStore.user?.type === 'C' ? 'History' : '' }}</h1>
        </div>
      </section>
      <!-- End of header -->

      <orders-table :orders="filteredOrders" :statuses="selectStatuses" :pageInfo="pageInfo" :changePage="changePage" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
