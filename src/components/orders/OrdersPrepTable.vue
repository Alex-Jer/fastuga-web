<script setup>
import { mdiTruckDelivery, mdiTruckDeliveryOutline } from '@mdi/js'
import { computed, inject, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import router from '@/router'

const moment = inject('moment')

const props = defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
  statuses: {
    type: Array,
    default: () => [],
  },
})

const orders = computed(() => props.orders)

const itemsPerPage = ref(8)
const currentPage = ref(0)

const itemsPaginated = computed(() =>
  orders.value?.slice(itemsPerPage.value * currentPage.value, itemsPerPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(orders.value.length / itemsPerPage.value))

const pagesList = computed(() => {
  const list = []
  for (let i = 0; i < numPages.value; i += 1) list.push(i)
  return list
})

const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY')
}

const showDetailsView = (id) => {
  router.push({ name: 'order', params: { id } })
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <table>
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Status</th>
          <th>Total Paid</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in itemsPaginated"
          :key="order.order_id"
          class="cursor-pointer"
          @click="showDetailsView(order.id)"
        >
          <td data-label="Ticket number">
            {{ order.ticket_number }}
          </td>
          <td data-label="Status">
            {{ props.statuses.find((status) => status.value === order.status)?.label }}
          </td>
          <td data-label="Total Paid">{{ order.total_paid }} €</td>
          <td data-label="Date">{{ formatDate(order.date) }}</td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiTruckDeliveryOutline"
                :label="'Ready'"
                small
                @click.stop="$emit('readyEvent', order.id)"
                v-if="order.status === 'P'"
              />
              <BaseButton
                color="info"
                :icon="mdiTruckDelivery"
                :label="'Delivered'"
                small
                @click.stop="$emit('deliverEvent', order.id)"
                v-if="order.status === 'R'"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPage + 1 }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </CardBox>
</template>
