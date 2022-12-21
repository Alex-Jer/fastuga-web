<script setup>
import { computed, ref, inject } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'

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

// const modalData = ref({
//   showAddToCartModal: false,
//   showDetailsModal: false,
//   showUpdateModal: false,
//   showDeleteModal: false,
//   product: {},
//   product_id: '',
//   action: '',
// })

const itemsPerPage = ref(8)
const currentPage = ref(0)

const itemsPaginated = computed(() =>
  orders.value.slice(itemsPerPage.value * currentPage.value, itemsPerPage.value * (currentPage.value + 1))
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

const showDetailsModal = (order) => {
  // modalData.value = { showDetailsModal: true, order }
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <!-- <ConfirmModal v-model="modalData.showAddToCartModal" :product="modalData.product">
      <p>
        Do you wish to add the product
        <b>{{ modalData.product.name }}</b>
        to your cart?
      </p>
    </ConfirmModal> -->

    <!-- <ProductModal
      v-model="modalData.showDetailsModal"
      :product="modalData.product"
      :types="props.types"
      :title="`Viewing Product #${modalData.product.product_id}`"
      action="view"
    />

    <ProductModal
      v-model="modalData.showUpdateModal"
      :product="modalData.product"
      :types="props.types"
      :title="`Updating Product #${modalData.product.product_id}`"
      action="update"
    />

    <ConfirmModal v-model="modalData.showDeleteModal" :product="modalData.product" is-delete>
      <p>
        Are you sure you want to delete the product
        <b>{{ modalData.product.name }}</b
        >?
      </p>
    </ConfirmModal> -->

    <table>
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Status</th>
          <th>Total Paid</th>
          <th>Payment Type</th>
          <th>Payment Reference</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in itemsPaginated"
          :key="order.order_id"
          class="cursor-pointer"
          @click="showDetailsModal(order)"
        >
          <td data-label="Ticket number">
            {{ order.ticket_number }}
          </td>
          <td data-label="Status">
            {{ props.statuses.find((status) => status.value === order.status)?.label }}
          </td>
          <td data-label="Total Paid">{{ order.total_paid }} €</td>
          <td data-label="Payment Type">{{ order.payment_type }}</td>
          <td data-label="Payment Reference">{{ order.payment_reference }}</td>
          <td data-label="Date">{{ formatDate(order.date) }}</td>
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
