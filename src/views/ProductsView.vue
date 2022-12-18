<script setup>
import { mdiFoodAppleOutline } from '@mdi/js'
import { onMounted, computed, ref } from 'vue'
import ProductsTable from '@/components/products/ProductsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const filterByType = ref('hot dish')

const loadProducts = () => {
  productsStore.loadProducts().catch((error) => {
    console.log(error)
  })
}

const loadTypes = () => {
  productsStore.loadTypes().catch((error) => {
    console.log(error)
  })
}

const filteredProducts = computed(() => {
  return productsStore.getProductsByFilter(filterByType.value)
})

onMounted(() => {
  // Calling loadProjects refreshes the list of projects from the API
  loadProducts()
  loadTypes()
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiFoodAppleOutline"
        title="Products"
        main
      >
      </SectionTitleLineWithButton>

      <products-table :products="filteredProducts" checkable />
    </SectionMain>
  </LayoutAuthenticated>
</template>
