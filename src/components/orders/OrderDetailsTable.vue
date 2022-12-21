<script setup>
import { ref } from 'vue'
import CardBox from '@/components/CardBox.vue'
import ProductDetailsModal from './ProductDetailsModal.vue'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const statuses = {
  R: 'Ready',
  P: 'Pending',
  C: 'Cancelled',
}

const modalData = ref({
  showDetailsModal: false,
  product: {},
})

const showDetailsModal = (product) => {
  modalData.value = { showDetailsModal: true, product }
}
</script>

<template>
  <ProductDetailsModal
    v-model="modalData.showDetailsModal"
    :product="modalData.product"
    :title="`Viewing Product #${modalData.product.product_id}`"
  />
  <CardBox class="mb-6" has-table>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-ellipsis">Notes</th>
          <th>Price</th>
          <th v-if="!props.order.all_dishes_ready">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.order?.items" :key="item.id" class="cursor-pointer" @click="showDetailsModal(item)">
          <td>{{ item.product.name }}</td>
          <td class="whitespace-nowrap text-ellipsis overflow-hidden max-w-xs">{{ item.notes }}</td>
          <td v-if="!props.order.all_dishes_ready">{{ statuses[item.status] }}</td>
          <td>{{ item.price }} €</td>
        </tr>
      </tbody>
    </table>
  </CardBox>
</template>
