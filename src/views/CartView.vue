<script setup>
import { mdiCartOutline, mdiCreditCardCheck, mdiCurrencyEur } from '@mdi/js'
import { ref, onMounted, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import CartTable from '@/components/cart/CartTable.vue'
import PaymentModal from '@/components/cart/PaymentModal.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useCartStore } from '@/stores/cart'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

const cartStore = useCartStore()
const toast = useToast()
const total = ref(0)

const showDetailsModal = ref(false)

const validate = () => {
  if (cartStore.items.length === 0) {
    toast.error('Your cart is empty')
    return
  }
  showDetailsModal.value = true
}

const sumTotal = () => {
  total.value = 0
  cartStore.items.forEach((item) => {
    total.value = Math.round((total.value + item.price * item.quantity) * 100) / 100
  })
}

watchEffect(() => {
  sumTotal()
})
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

      <div class="grid grid-cols-1 lg:grid-cols-3">
        <CardBox is-invisible />
        <CardBox is-invisible />

        <CardBox v-show="cartStore.items.length > 0">
          <FormField label="Total">
            <FormControl v-model="total" :icon="mdiCurrencyEur" disabled />
          </FormField>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
