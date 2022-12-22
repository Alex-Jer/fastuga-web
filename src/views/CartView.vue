<script setup>
import { mdiCartOutline, mdiCreditCardCheck } from '@mdi/js'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import CartTable from '@/components/cart/CartTable.vue'
import PaymentModal from '@/components/cart/PaymentModal.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const toast = useToast()

const showDetailsModal = ref(false)

const validate = () => {
  if (cartStore.items.length === 0) {
    toast.error('Your cart is empty')
    return
  }
  showDetailsModal.value = true
}
</script>

<template>
  <LayoutAuthenticated>
    <PaymentModal v-model="showDetailsModal" title="Payment Details" />
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCartOutline" title="Cart" main>
        <BaseButton
          color="info"
          label="Checkout"
          :icon="mdiCreditCardCheck"
          @click="validate"
          :disabled="cartStore.items.length === 0"
          rounded-full
        />
      </SectionTitleLineWithButton>

      <cart-table :products="cartStore.items" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
