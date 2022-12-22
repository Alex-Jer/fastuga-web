<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { Chart, LineElement, PointElement, LineController, LinearScale, CategoryScale, Tooltip } from 'chart.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const root = ref(null)

let chart

Chart.register(LineElement, PointElement, LineController, LinearScale, CategoryScale, Tooltip)

onMounted(() => {
  chart = new Chart(root.value, {
    type: 'line',
    data: props.data,
    options: {
      showDatasetLabels: true,
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
        },
        y: {
          title: 'Profit',
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            drawOnChartArea: false,
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  })
})

const chartData = computed(() => props.data)

watch(chartData, (data) => {
  if (chart) {
    chart.data = data
    chart.update()
  }
})
</script>

<template>
  <canvas ref="root" />
</template>
