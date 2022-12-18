<script setup>
import { mdiFoodAppleOutline, mdiPlus } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import IconRounded from '@/components/IconRounded.vue'
import NewProductModal from '@/components/products/NewProductModal.vue'
import ProductsTable from '@/components/products/ProductsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const isModalActive = ref(false)
const filterByType = ref('hot dish')
const isFetching = ref(true)

const loadProducts = async () => {
  await productsStore.loadProducts().catch((error) => {
    console.log(error)
  })
}

const loadTypes = async () => {
  await productsStore.loadTypes().catch((error) => {
    console.log(error)
  })
}

const filteredProducts = computed(() => {
  return productsStore.getProductsByFilter(filterByType.value)
})

onMounted(async () => {
  // Calling loadProjects refreshes the list of projects from the API
  await loadProducts()
  await loadTypes()
  isFetching.value = false
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <NewProductModal
        v-if="!isFetching"
        v-model="isModalActive"
        title="Add a new product"
      >
        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
        <p>This is sample modal</p>
      </NewProductModal>

      <!-- Start of header -->
      <section class="mb-6 flex items-center justify-between pt-6">
        <div class="flex items-center justify-start">
          <IconRounded
            :icon="mdiFoodAppleOutline"
            color="light"
            class="mr-3"
            bg
          />
          <h1 class="text-3xl leading-tight">Products</h1>
        </div>
        <BaseButton
          :icon="mdiPlus"
          color="whiteDark"
          @click="isModalActive = true"
        />
      </section>
      <!-- End of header -->

      <products-table
        :products="filteredProducts"
        :types="productsStore.types"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
