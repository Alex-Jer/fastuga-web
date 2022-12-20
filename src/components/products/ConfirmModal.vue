<script setup>
import { mdiClose } from '@mdi/js'
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useProductsStore } from '@/stores/products'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  product: {
    type: Object,
    default: null,
  },
  isDelete: {
    type: Boolean,
    default: false,
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

const cancel = () => confirmCancel('cancel')

const deleteProduct = () => {
  const productsStore = useProductsStore()
  productsStore
    .deleteProduct(props.product)
    .then((res) => {
      if (res.status === 200) toast.success('Product was deleted successfully!')
    })
    .catch((error) => {
      if (error.status === 404) toast.error('Product was not found!')
      if (error.status === 422) toast.error(error.data.message)
      if (error.status !== 404 && error.status !== 422)
        toast.error('Product was not deleted due to an unknown server error!')
    })
  cancel()
}

const addProductToCart = () => {
  toast(`${props.product.name} was added to the cart`)
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) cancel()
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="props.isDelete ? `Delete product #${product.product_id}?` : 'Add to cart'">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton
            :label="props.isDelete ? 'Delete' : 'Confirm'"
            :color="props.isDelete ? 'danger' : 'info'"
            @click="props.isDelete ? deleteProduct() : addProductToCart()"
          />
          <BaseButton label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
