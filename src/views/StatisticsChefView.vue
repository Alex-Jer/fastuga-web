<script setup>
import { mdiCancel, mdiChartTimelineVariant, mdiCheckCircleOutline, mdiChefHat } from '@mdi/js'
import { onMounted, computed } from 'vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useStatisticsStore } from '@/stores/statistics'
import { processGeneralError } from '@/requestHelper'

const statisticsStore = useStatisticsStore()
const stats = computed(() => statisticsStore.statistics)

const numDishPrepared = computed(() => stats.value?.num_dishes_prepared)

const allDishesPrepared = computed(() => numDishPrepared.value?.all)
const dishesPreparedCanceled = computed(() => numDishPrepared.value?.cancelled)
const dishesPreparedNotCanceled = computed(() => numDishPrepared.value?.not_cancelled)

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
          :icon="mdiChefHat"
          :number="allDishesPrepared"
          label="Total dishes prepared"
        />

        <CardBoxWidget
          color="text-emerald-500"
          :icon="mdiCheckCircleOutline"
          :number="dishesPreparedNotCanceled"
          label="Non-cancelled dishes prepared"
        />
        <CardBoxWidget
          color="text-red-500"
          :icon="mdiCancel"
          :number="dishesPreparedCanceled"
          label="Canceled dishes prepared"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
