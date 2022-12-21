<script setup>
import { mdiAccount, mdiAsterisk, mdiEmail, mdiPhone } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useUserStore } from '@/stores/user.js'
import FormFilePicker from '@/components/FormFilePicker.vue'

const form = ref({
  name: 'test',
  email: 'test@test.test',
  phone: '123456789',
  password: '123456',
  confirmPassword: '123456',
  photo: null,
})

const newCustomer = () => {
  return {
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    password: form.value.password,
    password_confirmation: form.value.confirmPassword,
    photo: form.value.photo,
  }
}

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const validate = () => {
  if (form.value.password.length < 6) {
    toast.error('Password must be at least 6 characters long!')
    return false
  }

  if (form.value.password !== form.value.confirmPassword) {
    toast.error('Passwords do not match!')
    return false
  }
  return true
}

const register = async () => {
  if (!validate()) return
  const customer = newCustomer()
  toast.info('Creating account...')

  await userStore
    .register(customer)
    .then((newUser) => {
      userStore.user.value = newUser
    })
    .catch((error) => {
      console.log({ error })
      if (error.response.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.clear()
        toast.error(errorMsg)
        return
      }
      toast.clear()
      toast.error('Something went wrong!')
    })

  if (!userStore.user?.value) return

  toast.clear()
  router.push('/')
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="register">
        <FormField label="Name">
          <FormControl v-model="form.name" :icon="mdiAccount" name="account" autocomplete="account" />
        </FormField>

        <FormField label="Email">
          <FormControl v-model="form.email" :icon="mdiEmail" name="email" autocomplete="email" type="email" />
        </FormField>

        <FormField label="Phone">
          <FormControl v-model="form.phone" :icon="mdiPhone" name="phone" autocomplete="phone" />
        </FormField>

        <FormField label="Password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="password"
          />
        </FormField>

        <FormField label="Confirm Password">
          <FormControl
            v-model="form.confirmPassword"
            :icon="mdiAsterisk"
            type="password"
            name="confirmPassword"
            autocomplete="confirmPassword"
          />
        </FormField>

        <FormField label="Avatar" help="Optional">
          <FormFilePicker label="Upload" v-model="form.photo" />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
