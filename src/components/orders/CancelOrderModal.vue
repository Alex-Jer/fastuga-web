<script setup>
import { mdiClose } from '@mdi/js'
import { computed, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useOrdersStore } from '@/stores/orders'
import BaseButtons from '../BaseButtons.vue'
import FormControl from '../FormControl.vue'
import FormField from '../FormField.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  order: {
    type: Object,
    default: null,
  },
})

const ordersStore = useOrdersStore()
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

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})

const form = reactive({
  reason: props.order?.reason,
})

const cancelOrder = async () => {
  ordersStore
    .cancelOrder(props.order.id, form.reason)
    .then(() => {
      toast.success('Order cancelled')
      cancel()
    })
    .catch((error) => {
      if (error.response.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.error(errorMsg)
      } else {
        toast.error('Something went wrong')
      }
    })

  // console.log(response)
}
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <FormField label="Reason" help="Optional. Why is this order being cancelled?">
        <FormControl v-model="form.reason" type="textarea" />
      </FormField>

      <template #footer>
        <BaseButtons>
          <BaseButton type="submit" color="danger" label="Cancel Order" @click="cancelOrder" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
