<script setup>
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
} from '@mdi/js'
import { onMounted, ref, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useStatisticsStore } from '@/stores/statistics'

const statisticsStore = useStatisticsStore()
const statistics = computed(() => statisticsStore.statistics)

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiChartTimelineVariant" title="Overview" main />

      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="512"
          label="Clients"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="7770"
          prefix="$"
          label="Sales"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </div>

      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Clients" />

      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>
    </SectionMain>
  </LayoutAuthenticated>
</template>
