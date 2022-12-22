<script setup>
import { mdiCartOutline, mdiCreditCardCheck } from '@mdi/js'
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import CartTable from '@/components/cart/CartTable.vue'
import PaymentModal from '@/components/cart/PaymentModal.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useCartStore } from '@/stores/cart'
// import { useUserStore } from '@/stores/user'

// const userStore = useUserStore()
const cartStore = useCartStore()

const showDetailsModal = ref(false)

const checkout = () => {
  showDetailsModal.value = true
  // console.log(userStore.user.customer.default_payment_type)
  // console.log(userStore.user.customer.default_payment_reference)
  // cartStore.placeOrder()
}
</script>

<template>
  <LayoutAuthenticated>
    <PaymentModal v-model="showDetailsModal" title="Payment Details" />
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCartOutline" title="Cart" main>
        <BaseButton color="info" label="Checkout" :icon="mdiCreditCardCheck" @click="checkout" rounded-full />
      </SectionTitleLineWithButton>

      <cart-table :products="cartStore.items" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
