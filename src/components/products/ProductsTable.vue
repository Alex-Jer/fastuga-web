<script setup>
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import { computed, inject, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import DeleteProductModal from './DeleteProductModal.vue'
import ProductModal from './ProductModal.vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  types: {
    type: Array,
    default: () => [],
  },
})

const apiDomain = inject('apiDomain')
const products = computed(() => {
  // return props.products
  // add a photo_path property to each product using the apiDomain and the photo_url property
  props.products.forEach((product) => {
    product.photo_path = `${apiDomain}/storage/products/${product.photo_url}`
  })
  // console.log(props.products)
  return props.products
})

const modalData = ref({ showDeleteModal: false, showUpdateModal: false, product: {}, action: '' })
const itemsPerPage = ref(8)
const currentPage = ref(0)

const itemsPaginated = computed(() =>
  products.value.slice(itemsPerPage.value * currentPage.value, itemsPerPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(products.value.length / itemsPerPage.value))

const pagesList = computed(() => {
  const list = []

  for (let i = 0; i < numPages.value; i += 1) {
    list.push(i)
  }

  return list
})

const showDeleteModal = (product) => {
  modalData.value = { showDeleteModal: true, product }
}

const showUpdateModal = (product) => {
  modalData.value = { showUpdateModal: true, product }
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <ProductModal
      v-model="modalData.showUpdateModal"
      :product="modalData.product"
      :types="props.types"
      title="Edit Product"
      action="update"
    />

    <DeleteProductModal v-model="modalData.showDeleteModal" :product="modalData.product">
      <p>
        Are you sure you want to delete the product
        <b>{{ modalData.product.name }}</b
        >?
      </p>
    </DeleteProductModal>

    <table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in itemsPaginated" :key="product.product_id">
          <td class="border-b-0 lg:w-6 before:hidden">
            <div class="w-24 h-24 mx-auto lg:w-10 lg:h-10">
              <img
                :src="product.photo_path"
                :alt="product.name"
                :title="product.name"
                class="w-full h-full bg-gray-100 rounded-full dark:bg-slate-800"
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
              <BaseButton color="info" :icon="mdiPencil" small @click="showUpdateModal(product)" />
              <BaseButton color="danger" :icon="mdiTrashCan" small @click="showDeleteModal(product)" />
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
