<script setup>
import { mdiTruckDelivery, mdiChartTimelineVariant, mdiCancel, mdiCheckCircleOutline } from '@mdi/js'
import { onMounted, computed } from 'vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useStatisticsStore } from '@/stores/statistics'
import { processGeneralError } from '@/requestHelper'

const statisticsStore = useStatisticsStore()
const stats = computed(() => statisticsStore.statistics)

const numOrdersDel = computed(() => stats.value?.num_orders_delivered)

const allOrdersDelivered = computed(() => numOrdersDel.value?.all)
const ordersCanceled = computed(() => numOrdersDel.value?.cancelled)
const ordersNotCanceled = computed(() => numOrdersDel.value?.not_cancelled)

const loadStatistics = async () => {
  await statisticsStore.loadStatistics().catch((err) => {
    processGeneralError(err, 'statistics')
  })
}

onMounted(async () => {
  await loadStatistics()
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiChartTimelineVariant" title="Statistics" main />

      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <CardBoxWidget
          color="text-blue-500"
          :icon="mdiTruckDelivery"
          :number="allOrdersDelivered"
          label="Total orders delivered"
        />

        <CardBoxWidget
          color="text-emerald-500"
          :icon="mdiCheckCircleOutline"
          :number="ordersNotCanceled"
          label="Non-cancelled orders delivered"
        />
        <CardBoxWidget
          color="text-red-500"
          :icon="mdiCancel"
          :number="ordersCanceled"
          label="Canceled orders delivered"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
