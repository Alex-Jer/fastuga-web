<script setup>
import { mdiClose } from '@mdi/js'
import { computed, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import FormField from '../FormField.vue'
import FormControl from '../FormControl.vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import BaseButtons from '../BaseButtons.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
})

const toast = useToast()
const userStore = useUserStore()
const cartStore = useCartStore()

const paymentTypes = [
  { id: 1, value: 'PAYPAL', label: 'PAYPAL' },
  { id: 2, value: 'MBWAY', label: 'MBWAY' },
  { id: 3, value: 'VISA', label: 'VISA' },
]

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

const cancel = () => confirmCancel('cancel')

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})

const form = reactive({
  payment_type: userStore.user.customer.default_payment_type || paymentTypes[0].value,
  payment_reference: userStore.user.customer.default_payment_reference || '',
  points_used: 0,
})

const reset = () => {
  form.payment_type = userStore.user.customer.default_payment_type || paymentTypes[0].value
  form.payment_reference = userStore.user.customer.default_payment_reference || ''
  form.points_used = 0
}

// watch(
//   () => [props.product, props.types],
//   ([product, types]) => {
//     form.name = product?.name
//     form.price = product?.price || ''
//     form.type = product?.type || types[0]?.value
//     form.description = product?.description || ''
//     form.photo = null
//   },
//   { immediate: true }
// )

const newPaymentInfo = () => {
  return {
    payment_type: form.payment_type,
    payment_reference: form.payment_reference,
    points_used: form.points_used,
  }
}

const save = () => {
  const paymentInfo = newPaymentInfo()
  cartStore
    .placeOrder(paymentInfo)
    .then(() => {
      toast.success('Order placed!')
      cancel()
    })
    .catch((error) => {
      if (error.response.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.error(errorMsg)
      } else {
        toast.error('Something went wrong. Please try again later.')
      }
    })
}

const validateForm = () => {
  if (!form.payment_type) {
    toast.error('Payment Type is required!')
    return false
  }

  if (!form.payment_reference) {
    toast.error('Payment Reference is required!')
    return false
  }

  return true
}

const submit = () => {
  if (!validateForm()) return
  save()
}
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBox form @submit.prevent="submit">
        <FormField label="Payment Type">
          <FormControl v-model="form.payment_type" :options="paymentTypes" />
        </FormField>

        <FormField label="Payment Reference">
          <FormControl v-model="form.payment_reference" />
        </FormField>

        <FormField label="Points to use" :help="descInfo">
          <FormControl v-model="form.points_used" />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" @click="submit" />
            <BaseButton type="reset" color="info" outline label="Reset" @click="reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>
