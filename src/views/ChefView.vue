<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import IconRounded from '@/components/IconRounded.vue'
import OrderItemsTable from '@/components/orders/OrderItemsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()


const loadPreparableDishes = async () => {
  await ordersStore.loadPreparableDishes().catch((error) => {
    console.log(error)
    console.log(ordersStore.loadPreparableDishes())
  })
}

const filteredOrders = computed(() => {
  console.log(ordersStore.orders)
  return ordersStore.orders
})

onMounted(async () => {
  await loadPreparableDishes()
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
      <order-items-table :orders="filteredOrders" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
