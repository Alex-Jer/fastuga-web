<script setup>
import { mdiFoodAppleOutline, mdiPlus } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import IconRounded from '@/components/IconRounded.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
const orders = ref([])
const statuses = ref([])
const isFetching = ref(true)
const selectTypes = ref([])

const loadUserOrders = async () => {
  await ordersStore.loadUserOrders().catch((error) => {
    console.log(error)
  })
}

const loadStatuses = async () => {
  await ordersStore.loadStatuses().catch((error) => {
    console.log(error)
  })
}

onMounted(async () => {
  await loadUserOrders()
  await loadStatuses()
  isFetching.value = false
})

ordersStore.types.forEach((type, index) => {
    selectTypes.value.push({
      id: index + 1,
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    })
  })

</script>
<template>
<LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiClipboardListOutline" title="Orders" main />
      <select>
      <option v-for="item in selectTypes" :key="item.id" :value="item.value">
            {{ item.label }}
          </option>
        </select>
    </SectionMain>
</LayoutAuthenticated>
</template>