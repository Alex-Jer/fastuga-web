<script setup>
import { mdiCheck, mdiChefHat } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'

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
</script>

<template>
  <CardBox class="mb-6" has-table>
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Product name</th>
          <th>Status</th>
          <th>Note</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.order" :key="item.order_id">
          <td data-label="Ticket number">{{ item.ticket_number }} - {{ item.item.order_local_number }}</td>
          <td data-label="Product name">{{ item.item.product.name }}</td>
          <td data-label="Status">
            {{ props.statuses.find((status) => status.value === item.item.status)?.label }}
          </td>
          <td data-label="Product name">{{ item.item.notes }}</td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :label="'Ready'"
                :icon="mdiCheck"
                small
                @click.stop="$emit('readyEvent', item.order_id, item.item.id)"
                v-if="item.item.status === 'P'"
              />
              <BaseButton
                color="info"
                :label="'Preparing'"
                :icon="mdiChefHat"
                small
                @click.stop="$emit('prepareEvent', item.order_id, item.item.id)"
                v-if="item.item.status === 'W'"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
  </CardBox>
</template>
