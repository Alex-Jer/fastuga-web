<script setup>
import { mdiClipboardTextClockOutline } from '@mdi/js'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import IconRounded from '@/components/IconRounded.vue'
import OrderItemsTable from '@/components/orders/OrderItemsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { processGeneralError } from '@/requestHelper'
import { useOrderItemsStore } from '@/stores/order-item'

const orderItemsStore = useOrderItemsStore()
const selectStatuses = ref([])
const toast = useToast()

const loadPreparableDishes = async () => {
  await orderItemsStore.loadPreparableDishes().catch((error) => {
    processGeneralError(error, 'dishes')
  })
}

const loadDishStatuses = () => {
  orderItemsStore.loadDishStatuses()
}

const prepareDish = async (order, item) => {
  await orderItemsStore
    .prepareDish(order, item)
    .then(() => {
      toast.success('Dish prepared')
    })
    .catch((error) => {
      processGeneralError(error, 'dish')
    })
}

const finishDish = async (order, item) => {
  await orderItemsStore
    .finishDish(order, item)
    .then(() => {
      toast.success('Dish finished')
    })
    .catch((error) => {
      processGeneralError(error, 'dish')
    })
}

onMounted(async () => {
  await loadPreparableDishes()
  loadDishStatuses()
  orderItemsStore.statuses.forEach((status, index) => {
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
      <order-items-table
        :items="orderItemsStore.items"
        :statuses="selectStatuses"
        @readyEvent="finishDish"
        @prepareEvent="prepareDish"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
