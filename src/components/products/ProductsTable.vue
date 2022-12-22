<script setup>
import { mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js'
import { computed, inject, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import ConfirmModal from './ConfirmModal.vue'
import AddToCartModal from '../cart/AddToCartModal.vue'
import ProductModal from './ProductModal.vue'
import { useUserStore } from '@/stores/user'

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
const products = computed(() => props.products)
const userStore = useUserStore()

const modalData = ref({
  showAddToCartModal: false,
  showDetailsModal: false,
  showUpdateModal: false,
  showDeleteModal: false,
  product: {},
  product_id: '',
  action: '',
})

const itemsPerPage = ref(8)
const currentPage = ref(0)

const itemsPaginated = computed(() =>
  products.value.slice(itemsPerPage.value * currentPage.value, itemsPerPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(products.value.length / itemsPerPage.value))

const pagesList = computed(() => {
  const list = []
  for (let i = 0; i < numPages.value; i += 1) list.push(i)
  return list
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const showAddToCartModal = (product) => {
  modalData.value = { showAddToCartModal: true, product }
}

const showDetailsModal = (product) => {
  modalData.value = { showDetailsModal: true, product }
}

const showUpdateModal = (product) => {
  modalData.value = { showUpdateModal: true, product }
}

const showDeleteModal = (product) => {
  modalData.value = { showDeleteModal: true, product }
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <AddToCartModal
      v-model="modalData.showAddToCartModal"
      :product="modalData.product"
      :title="`Add ${modalData.product.name} to cart?`"
    />

    <ProductModal
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
    </ConfirmModal>

    <table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th v-if="(userStore.user?.type === 'C' || !userStore.user) && $route.name === 'home'" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in itemsPaginated"
          :key="product.product_id"
          class="cursor-pointer"
          @click="showDetailsModal(product)"
        >
          <td class="border-b-0 lg:w-6 before:hidden">
            <div class="w-24 h-24 mx-auto lg:w-10 lg:h-10">
              <img
                :src="`${apiDomain}/storage/products/${product.photo_url}`"
                :alt="product.name"
                :title="product.name"
                class="w-full h-full bg-gray-100 rounded-full dark:bg-slate-800"
              />
            </div>
          </td>
          <td data-label="Name">{{ product.name }}</td>
          <td data-label="Type">{{ capitalize(product.type) }}</td>
          <td data-label="Price">{{ product.price }} €</td>
          <td class="before:hidden lg:w-1 whitespace-nowrap" v-if="$route.name === 'products'">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :icon="mdiPencil" small @click.stop="showUpdateModal(product)" />
              <BaseButton color="danger" :icon="mdiTrashCan" small @click.stop="showDeleteModal(product)" />
            </BaseButtons>
          </td>
          <td
            class="before:hidden lg:w-1 whitespace-nowrap"
            v-if="(userStore.user?.type === 'C' || !userStore.user) && $route.name === 'home'"
          >
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :icon="mdiPlus" small @click.stop="showAddToCartModal(product)" />
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
