<script setup>
import { mdiFoodAppleOutline, mdiTableOff } from '@mdi/js'
import { onMounted } from 'vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import ProductsTable from '@/components/products/ProductsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const loadProducts = () => {
  productsStore.loadProducts().catch((error) => {
    console.log(error)
  })
}

onMounted(() => {
  // Calling loadProjects refreshes the list of projects from the API
  loadProducts()
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

      <products-table :products="products?.value" checkable />
    </SectionMain>
  </LayoutAuthenticated>
</template>
