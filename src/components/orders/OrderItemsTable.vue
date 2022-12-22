<script setup>
import { computed, ref, inject } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import { mdiCheck } from '@mdi/js';

const moment = inject('moment')

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})


const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY')
}

const ready = (order) => {
  
}
</script>

<template>
  <CardBox class="mb-6" has-table>

    <table>
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="order in props.order"
          :key="order.id"
          class="cursor-pointer"
        >
          <td data-label="Ticket number">
            {{ item.id }}
          </td>
          <td data-label="Status">
            {status}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap" >
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :icon="mdiCheck" small  @click.stop="ready(order)"  />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
  
  </CardBox>
</template>
