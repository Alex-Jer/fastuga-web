<script setup>
import { mdiCartOutline, mdiCreditCardCheck, mdiCurrencyEur, mdiInformation } from '@mdi/js'
import { reactive, ref, watch, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CartTable from '@/components/cart/CartTable.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()

const toast = useToast()
const total = ref(0)

const paymentTypes = [
  { id: 1, value: 'PAYPAL', label: 'PAYPAL' },
  { id: 2, value: 'MBWAY', label: 'MBWAY' },
  { id: 3, value: 'VISA', label: 'VISA' },
]

const form = reactive({
  payment_type: userStore.user?.customer.default_payment_type || paymentTypes[0].value,
  payment_reference: userStore.user?.customer.default_payment_reference || '',
  points_used: 0,
})

const reset = () => {
  form.payment_type = userStore.user?.customer.default_payment_type || paymentTypes[0].value
  form.payment_reference = userStore.user?.customer.default_payment_reference || ''
  form.points_used = 0
}

watch(
  () => [userStore.user?.customer],
  ([customer]) => {
    form.payment_type = customer?.default_payment_type || paymentTypes[0].value
    form.payment_reference = customer?.default_payment_reference || ''
  },
  { immediate: true }
)

const validate = () => {
  if (cartStore.items.length === 0) {
    toast.error('Your cart is empty')
    return false
  }

  if (!form.payment_type || !form.payment_reference || form.points_used === '') {
    toast.error('Please fill in all fields')
    console.log(form)
    return false
  }

  if (form.payment_type === 'MBWAY' && form.payment_reference.length !== 9) {
    toast.error('MBWAY number must have 9 digits')
    return false
  }

  if (form.payment_type === 'VISA' && form.payment_reference.length !== 16) {
    toast.error('VISA number must have 16 digits')
    return false
  }

  if (form.points_used > userStore.user?.customer.points) {
    toast.error('You do not have enough points')
    return false
  }

  return true
}

const newPaymentInfo = () => {
  return {
    payment_type: form.payment_type,
    payment_reference: form.payment_reference,
    points_used: form.points_used,
  }
}

const checkout = () => {
  const paymentInfo = newPaymentInfo()
  cartStore
    .placeOrder(paymentInfo)
    .then(() => {
      toast.success('Order placed!')
      reset()
    })
    .catch((error) => {
      if (error.response.status === 422 || error.response.status === 402) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.error(errorMsg)
        return
      }
      toast.error('Something went wrong. Please try again later.')
    })
}

const submit = () => {
  if (!validate()) return
  checkout()
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
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCartOutline" title="Cart" main>
        <BaseButton
          color="info"
          label="Checkout"
          :icon="mdiCreditCardCheck"
          @click="submit"
          :disabled="cartStore.items.length === 0"
          rounded-full
        />
      </SectionTitleLineWithButton>

      <cart-table :products="cartStore.items" />

      <div class="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
        <CardBox v-show="cartStore.items.length > 0">
          <FormField label="Payment Type">
            <FormControl v-model="form.payment_type" :options="paymentTypes" />
          </FormField>

          <FormField label="Payment Reference">
            <FormControl v-model="form.payment_reference" />
          </FormField>

          <NotificationBar v-if="!userStore.user" color="info" :icon="mdiInformation">
            <b>You won't gain any points unless you log in!</b>
          </NotificationBar>

          <FormField label="Points to use" v-if="userStore.user">
            <FormControl v-model="form.points_used" />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="reset" color="contrast" label="Reset" @click="reset" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox v-show="cartStore.items.length > 0">
          <FormField label="Total">
            <FormControl v-model="total" :icon="mdiCurrencyEur" disabled />
          </FormField>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
