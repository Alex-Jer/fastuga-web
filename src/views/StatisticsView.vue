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
import { processGeneralError } from '@/requestHelper'

const statisticsStore = useStatisticsStore()
const stats = computed(() => statisticsStore.statistics)

const totalCustomers = computed(() => stats.value?.total_customers)

const totalProfit = computed(() => stats.value?.total_profit)
const totalOrders = computed(() => stats.value?.total_orders)
const monthsHistory = computed(() => stats.value?.months_history)

const lastMonthProfit = computed(() => {
  if (!monthsHistory.value) return 0
  return monthsHistory.value.profit[1].money_made
})

const lastMonthProfitPerc = computed(() => {
  if (!monthsHistory.value) return 0
  const beforeLastMonth = monthsHistory.value.profit[2].money_made
  return Math.round((lastMonthProfit.value / beforeLastMonth - 1) * 100)
})

const chartData = ref(null)

const loadStatistics = async () => {
  await statisticsStore.loadStatistics().catch((err) => {
    processGeneralError(err, 'statistics')
  })
}

const datasetObject = (color, data) => {
  return {
    fill: false,
    borderColor: chartConfig.chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartConfig.chartColors.default[color],
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: chartConfig.chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data,
    tension: 0.5,
    cubicInterpolationMode: 'default',
  }
}

const monthsToChartData = () => {
  const labels = []
  for (let i = 1; i <= 12; i += 1) {
    labels.push(`${i}`)
  }

  //const data

  return {
    labels,
    datasets: [datasetObject('primary', points), datasetObject('danger', points)],
  }
}

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(async () => {
  await loadStatistics()
  fillChartData()
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiChartTimelineVariant" title="Statistics" main />

      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <CardBoxWidget
          trend="All time"
          trend-type="info"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="totalCustomers"
          label="Clients"
        />
        <CardBoxWidget
          :trend="lastMonthProfitPerc + '%'"
          :trend-type="lastMonthProfitPerc >= 0 ? 'up' : 'down'"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="lastMonthProfit"
          prefix="$"
          label="Sales last month"
        />
        <CardBoxWidget
          :trend="'Total orders: ' + totalOrders"
          trend-type="info"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="totalProfit"
          prefix="$"
          label="Total Sales"
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

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Monthly overview" />

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
