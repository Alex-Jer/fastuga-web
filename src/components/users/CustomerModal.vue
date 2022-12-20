<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBox form>
        <FormField label="Name">
          <FormControl v-model="form.name" :icon="mdiAccount" placeholder="Name" disabled />
        </FormField>

        <FormField label="Email">
          <FormControl v-model="form.email" :icon="mdiEmail" placeholder="Email" disabled />
        </FormField>

        <FormField label="Phone">
          <FormControl v-model="form.phone" :icon="mdiPhone" placeholder="Phone" disabled />
        </FormField>

        <FormField label="Points and NIF">
          <FormControl v-model="form.points" :icon="mdiStarCircle" placeholder="Points" disabled />
          <FormControl v-model="form.nif" :icon="mdiCardAccountDetails" placeholder="NIF" disabled />
        </FormField>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>

<script setup>
import { mdiAccount, mdiCardAccountDetails, mdiClose, mdiEmail, mdiPhone, mdiStarCircle } from '@mdi/js'
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
  user: {
    type: Object,
    default: null,
  },
  action: {
    type: String,
    default: '',
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
  name: props.user?.name,
  email: props.user?.email,
  phone: props.user?.customer?.phone,
  points: props.user?.points,
  nif: props.user?.nif,
})

watch(
  () => props.user,
  (user) => {
    form.name = user?.name
    form.email = user?.email
    form.phone = user?.customer?.phone
    form.points = user?.customer?.points
    form.nif = user?.customer?.nif
  },
  { immediate: true }
)
</script>
