<script setup>
import { mdiCheck, mdiChefHat } from '@mdi/js'
import { computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import BaseLevel from '../BaseLevel.vue'

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  statuses: {
    type: Array,
    default: () => [],
  },
})

const items = computed(() => props.items)

const itemsPerPage = ref(8)
const currentPage = ref(0)

const itemsPaginated = computed(() =>
  items.value?.slice(itemsPerPage.value * currentPage.value, itemsPerPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value))

const pagesList = computed(() => {
  const list = []
  for (let i = 0; i < numPages.value; i += 1) list.push(i)
  return list
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
        <tr v-for="item in itemsPaginated" :key="item.item.id">
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
