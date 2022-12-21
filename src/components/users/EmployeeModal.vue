<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBox form @submit.prevent="submit">
        <FormField label="Name">
          <FormControl v-model="form.name" :icon="mdiAccount" placeholder="Name" :disabled="props.action === 'view'" />
        </FormField>

        <FormField label="Email" v-if="props.action !== 'update'">
          <FormControl v-model="form.email" :icon="mdiEmail" placeholder="Email" :disabled="props.action === 'view'" />
        </FormField>

        <FormField label="Type">
          <FormControl v-model="form.type" :options="types" :disabled="props.action === 'view'" />
        </FormField>

        <FormField label="Password" v-if="props.action === 'insert'">
          <FormControl v-model="form.password" :icon="mdiAccount" type="password" placeholder="Password" />
          <FormControl
            v-model="form.confirmPassword"
            :icon="mdiAccount"
            type="password"
            placeholder="Confirm password"
          />
        </FormField>

        <FormFilePicker
          v-if="props.action === 'insert' || props.action === 'update'"
          label="Upload profile picture"
          v-model="form.photo"
        />

        <template #footer>
          <BaseButtons v-if="props.action === 'insert' || props.action === 'update'">
            <BaseButton type="submit" color="info" label="Submit" @click="submit" />
            <BaseButton
              v-if="props.action === 'insert'"
              type="reset"
              color="info"
              outline
              label="Reset"
              @click="reset"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>

<script setup>
import { mdiAccount, mdiClose, mdiEmail } from '@mdi/js'
import { computed, reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useUsersStore } from '@/stores/users'
import FormControl from '../FormControl.vue'
import FormField from '../FormField.vue'
import FormFilePicker from '../FormFilePicker.vue'

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
  types: {
    type: Array,
    default: () => [],
  },
  action: {
    type: String,
    default: '',
  },
})

const toast = useToast()
const usersStore = useUsersStore()
const types = computed(() => props.types.filter((type) => type.value !== 'C'))

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

// const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})

const form = reactive({
  name: props.user?.name,
  email: props.user?.email,
  type: props.user?.type,
  password: '',
  confirmPassword: '',
  photo: null,
})

const reset = () => {
  form.name = ''
  form.email = ''
  form.type = types.value[0]?.value
  form.password = ''
  form.confirmPassword = ''
  // form.photo = null
}

watch(
  () => [props.user, types],
  ([user]) => {
    form.name = user?.name
    form.email = user?.email
    form.type = user?.type || types.value[0]?.value
    form.photo = null
  },
  { immediate: true }
)

const newUser = () => {
  return {
    user_id: props.user?.user_id || null,
    name: form.name,
    email: form.email,
    type: form.type,
    password: form.password,
    password_confirmation: form.confirmPassword,
    photo: form.photo,
    photo_url: props.user?.photo_url || null,
  }
}

const user = ref(newUser())

const save = () => {
  user.value = newUser()

  if (props.action === 'insert') {
    usersStore
      .insertUser(user.value)
      .then((insertedUser) => {
        user.value = insertedUser
        toast.success(`User #${insertedUser.user_id} was created successfully.`)
        reset()
        cancel()
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
          toast.error(errorMsg)
        } else {
          toast.error('User was not created due to unknown server error!')
        }
      })
    return
  }

  usersStore
    .updateUser(user.value)
    .then((updatedUser) => {
      user.value = updatedUser
      toast.success(`User #${props.user.user_id} was updated successfully.`)
      reset()
      cancel()
    })
    .catch((error) => {
      if (error.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.data.message))
        toast.error(errorMsg)
      } else {
        toast.error(`User #${props.user.user_id} was not updated due to unknown server error!`)
      }
    })
}

const validateForm = () => {
  const msg = "Please insert the user's"

  const formErrors = [
    !form.name && 'name',
    !form.email && 'email',
    !form.type && 'type',
    props.action === 'insert' && !form.password && 'password',
    props.action === 'insert' && !form.confirmPassword && 'password',
  ].filter((error) => error)

  if (formErrors.length === 2) {
    toast.error(`${msg} ${formErrors.join(' and ')}`)
    return false
  }

  if (formErrors.length > 0) {
    toast.error(`${msg} ${formErrors.join(', ')}`)
    return false
  }

  if (form.password !== form.confirmPassword) {
    toast.error("Passwords don't match")
    return false
  }

  return true
}

const submit = () => {
  if (!validateForm()) return
  save()
}
</script>
