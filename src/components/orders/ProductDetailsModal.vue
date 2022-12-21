<script setup>
import { mdiClose, mdiCurrencyEur, mdiFoodApple } from '@mdi/js'
import { computed, reactive, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
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
  product: {
    type: Object,
    default: null,
  },
})

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
  name: props.product?.product?.name,
  price: props.product?.price,
  notes: props.product?.notes,
  photo: null,
})

watch(
  () => [props.product],
  ([product]) => {
    form.name = product?.product?.name
    form.price = product?.price || ''
    form.notes = product?.notes || ''
    form.photo = null
  },
  { immediate: true }
)
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBox>
        <FormField label="Name">
          <FormControl v-model="form.name" :icon="mdiFoodApple" disabled />
        </FormField>

        <FormField label="Price">
          <FormControl v-model="form.price" :icon="mdiCurrencyEur" disabled />
        </FormField>

        <FormField label="Note" :help="descInfo">
          <FormControl v-model="form.notes" type="textarea" placeholder="No note" disabled />
        </FormField>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>
