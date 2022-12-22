<script setup>
import { mdiClose } from '@mdi/js'
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
  item: {
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
  name: props.item?.item?.product.name,
  preparation_by: props.item?.item?.preparation_by,
  type: props.item?.item?.product.type,
  notes: props.item?.item?.product.notes,
})

watch(
  () => [props.item],
  ([item]) => {
    form.name = item?.item?.product.name
    form.preparation_by = item?.item?.preparation_by
    form.type = item?.item?.product.type
    form.notes = item?.item?.notes
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

      <CardBox form @submit.prevent="submit">
        <FormField label="Name">
          <FormControl v-model="form.name" disabled />
        </FormField>

        <FormField label="Preparation by">
          <FormControl v-model="form.preparation_by" disabled />
        </FormField>

        <FormField label="Type">
          <FormControl v-model="form.type" disabled />
        </FormField>

        <FormField label="Notes" :help="descInfo">
          <FormControl type="textarea" disabled />
        </FormField>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>
