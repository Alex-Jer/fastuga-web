<script setup>
import { computed, ref, inject } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import { mdiCheck, mdiChefHat } from '@mdi/js';



const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
  statuses: {
    type: Array,
    default: () => [],
  },
})


const ready = () => {
  //this.$emit('readyEvent', item.order_id, item.item.id)
}

const prepare = () => {
  //this.$emit('prepareEvent', item.order_id, item.item.id)
}


</script>

<template>
  <CardBox class="mb-6" has-table>

    <table>
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Product ID</th>
          <th>Product name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="item in props.order"
          :key="item.order_id"
        >
          <td data-label="Ticket number">
            {{ item.ticket_number }}
          </td>
          <td data-label="Product id">
            {{ item.item.id }}
          </td>
          <td data-label="Product name">
            {{ item.item.product.name }}
          </td>
          <td data-label="Status">
            {{ props.statuses.find((status) => status.value === item.item.status)?.label }}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap" >
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :label="'Ready'" :icon="mdiCheck" small  @click.stop="ready(item.order_id, item.item.id)" v-if="item.item.status === 'P'" />
              <BaseButton color="info" :label="'Preparing'" :icon="mdiChefHat" small  @click.stop="prepare(item.order_id, item.item.id)" v-if="item.item.status === 'W'" />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
  
  </CardBox>
</template>
