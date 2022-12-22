<script setup>
import { mdiClose } from '@mdi/js'
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  product: {
    type: Object,
    default: null,
  },
})

const toast = useToast()

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}
const useCart = useCartStore()

const cancel = () => {
  confirmCancel('cancel')
}

const removeFromCart = () => {
  useCart.removeFromCart(props.product)
  toast(`${props.product.name} was removed from the cart`)
  cancel()
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) cancel()
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="`Remove ${product.name} from the cart?`">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton label="Remove" color="danger" @click="removeFromCart()" />
          <BaseButton label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
