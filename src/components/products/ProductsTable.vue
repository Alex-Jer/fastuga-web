<script setup>
import { mdiEye, mdiTrashCan } from '@mdi/js'
import { computed, inject, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import { useProductsStore } from '@/stores/products'

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  checkable: Boolean,
})

const productsStore = useProductsStore()

const apiDomain = inject('apiDomain')
const products = computed(() => productsStore.products)

const isModalActive = ref(false)
const isModalDangerActive = ref(false)
const perPage = ref(5)
const currentPage = ref(0)
const checkedRows = ref([])

const itemsPaginated = computed(() =>
  products.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
)

const numPages = computed(() =>
  Math.ceil(products.value.length / perPage.value)
)

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const list = []

  for (let i = 0; i < numPages.value; i += 1) {
    list.push(i)
  }

  return list
})

// const remove = (arr, cb) => {
//   const newArr = []

//   arr.forEach((item) => {
//     if (!cb(item)) {
//       newArr.push(item)
//     }
//   })

//   return newArr
// }

// const checked = (isChecked, client) => {
//   if (isChecked) {
//     checkedRows.value.push(client)
//   } else {
//     checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
//   }
// }
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 mr-2 text-sm bg-gray-100 rounded-sm dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Name</th>
        <th>Type</th>
        <th>Price</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in itemsPaginated" :key="product.product_id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, product)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <div class="w-24 h-24 mx-auto lg:w-6 lg:h-6">
            <img
              :src="`${apiDomain}/storage/products/${product.photo_url}`"
              :alt="product.name"
              :title="product.name"
              class="block w-full h-auto max-w-full bg-gray-100 rounded-full dark:bg-slate-800"
            />
          </div>
        </td>
        <td data-label="Name">
          {{ product.name }}
        </td>
        <td data-label="Type">
          {{ product.type }}
        </td>
        <td data-label="Price">{{ product.price }} €</td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
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
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
