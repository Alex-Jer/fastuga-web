<script setup>
import { mdiAccount, mdiAsterisk, mdiEmail, mdiFormTextboxPassword, mdiPhone } from '@mdi/js'
import { reactive, ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import UserCard from '@/components/UserCard.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useUserStore } from '@/stores/user'
import BaseDivider from '@/components/BaseDivider.vue'

const userStore = useUserStore()

const toast = useToast()
const user = ref()
const isFetching = ref(true)
const paymentTypes = ref()

const loadPaymentTypes = async () => {
  await userStore.loadPaymentTypes().catch((error) => {
    console.log(error)
  })
}

const profileForm = reactive({
  name: userStore.user.name,
  email: userStore.user.email,
  phone: userStore.user.customer?.phone,
})

const paymentForm = reactive({
  nif: userStore.user.customer?.nif,
  defaultPaymentType: userStore.user.customer?.default_payment_type,
  defaultPaymentReference: userStore.user.customer?.default_payment_reference,
})

console.log(userStore.user.customer?.default_payment_type)

const passwordForm = reactive({
  password: '',
  passwordCurrent: '',
  passwordConfirmation: '',
})

const newCustomer = () => {
  return {
    user_id: userStore.user?.user_id || null,
    name: profileForm.name || null,
    email: profileForm.email || null,
    email_confirmation: profileForm.email || null,
    phone: profileForm.phone || null,
    photo: profileForm.photo || null,
    // photo_url: userStore.user?.photo_url || null,
  }
}

const newPassword = () => {
  return {
    new_password: passwordForm.password || null,
    old_password: passwordForm.passwordCurrent || null,
    new_password_confirmation: passwordForm.passwordConfirmation || null,
  }
}

const submitProfile = async () => {
  user.value = newCustomer()
  let hasError = false

  await userStore
    .updateEmail(user.value)
    .then((updatedUser) => {
      userStore.user.value = updatedUser
    })
    .catch((error) => {
      if (error.response.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.error(errorMsg)
        hasError = true
        return
      }
      hasError = true
      toast.error('Your email was not updated due to an unknown server error!')
    })

  if (hasError) return

  console.log(user.value)
  await userStore
    .updateDetails(user.value)
    .then((updatedUser) => {
      userStore.user.value = updatedUser
      toast.success('Your profile was updated successfully.')
    })
    .catch((error) => {
      if (error.response.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.error(errorMsg)
      } else {
        toast.error(`User #${userStore.user.user_id} was not updated due to an unknown server error!`)
      }
    })
}

const validatePassword = () => {
  if (passwordForm.passwordCurrent === '') {
    toast.error('Please enter your current password.')
    return false
  }

  if (passwordForm.password === '') {
    toast.error('Please enter your new password.')
    return false
  }

  if (passwordForm.passwordConfirmation === '') {
    toast.error('Please confirm your new password.')
    return false
  }

  if (passwordForm.password.length < 6) {
    toast.error('Your new password must be at least 6 characters long.')
    return false
  }

  if (passwordForm.password !== passwordForm.passwordConfirmation) {
    toast.error('Your new password and confirmation do not match.')
    return false
  }

  return true
}

const submitPass = () => {
  if (!validatePassword()) return

  user.value = newPassword()

  console.log(user.value)

  userStore
    .updatePassword(user.value)
    .then((updatedUser) => {
      userStore.user.value = updatedUser
      toast.success(`Your password was successfully updated.`)
    })
    .catch((error) => {
      if (error.response.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
        toast.error(errorMsg)
        return
      }
      toast.error('Your password was not updated due to an unknown server error!')
    })
}

onMounted(async () => {
  await loadPaymentTypes()
  isFetching.value = false
  paymentTypes.value = userStore.paymentTypes
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiAccount" title="Profile" main />

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CardBox is-form @submit.prevent="submitProfile">
          <FormField label="Avatar" help="Max 8mb (8192kb)">
            <FormFilePicker label="Upload" v-model="profileForm.photo" />
          </FormField>

          <FormField label="Name" help="Required. Your name">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiEmail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>
          <FormField label="Phone number" help="Required. Your phone number" v-if="userStore.user.customer">
            <FormControl v-model="profileForm.phone" :icon="mdiPhone" name="phone" required autocomplete="phone" />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPaymentDetails" v-if="userStore.user.customer">
          <FormField label="NIF">
            <FormControl v-model="paymentForm.nif" :icon="mdiAccount" name="nif" required autocomplete="nif" />
          </FormField>
          <FormField label="Default payment type">
            <FormControl v-model="paymentForm.defaultPaymentType" :icon="mdiEmail" :options="paymentTypes" />
          </FormField>
          <FormField label="Default payment reference">
            <FormControl
              v-model="paymentForm.defaultPaymentReference"
              :icon="mdiPhone"
              name="paymentReference"
              required
              autocomplete="paymentReference"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField label="Current password" help="Required. Your current password">
            <FormControl
              v-model="passwordForm.passwordCurrent"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />
          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
            <FormControl
              v-model="passwordForm.passwordConfirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
