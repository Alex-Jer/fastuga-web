<script setup>
import { mdiClose, mdiFoodApple } from '@mdi/js'
import { computed, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import FormControl from '../FormControl.vue'
import FormField from '../FormField.vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  product: {
    type: Object,
    default: null,
  },
})

const useCart = useCartStore()
const toast = useToast()

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const form = reactive({
  quantity: 1,
  notes: '',
})

const reset = () => {
  form.quantity = 1
  form.notes = ''
}

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

const cancel = () => {
  reset()
  confirmCancel('cancel')
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})

const newProduct = () => {
  return {
    product_id: props.product?.product_id || null,
    price: props.product?.price || '',
    name: props.product?.name || '',
    description: props.product?.description || '',
    photo_url: props.product?.photo_url || '',
    type: props.product?.type || '',
    quantity: form.quantity,
    notes: form.notes,
  }
}

const product = ref(newProduct())

const addToCart = () => {
  product.value = newProduct()
  useCart.addToCart(product.value)
  toast(`${props.product.name} was added to the cart`)
  cancel()
}

const validateForm = () => {
  if (form.quantity <= 0) {
    toast.error('Quantity must be greater than 0')
    return false
  }

  if (form.notes.length > 255) {
    toast.error('Notes must be less than 255 characters')
    return false
  }

  return true
}

const submit = () => {
  if (!validateForm()) return
  addToCart()
}
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBox form @submit.prevent="submit">
        <FormField label="Quantity">
          <FormControl v-model="form.quantity" :icon="mdiFoodApple" />
        </FormField>

        <FormField label="Notes" :help="descInfo">
          <FormControl v-model="form.notes" type="textarea" placeholder="A brief note about the product" />
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
