<script setup>
import { mdiCartOutline } from '@mdi/js'
import CartTable from '@/components/cart/CartTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// onMounted(() => {})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiCartOutline" title="Cart" main />

      <cart-table :products="cartStore.items" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
