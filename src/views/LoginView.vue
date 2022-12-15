<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useUserStore } from '@/stores/user'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  email: 'manager_1@mail.pt',
  password: '123',
  // remember: true,
})

const router = useRouter()

const userStore = useUserStore()

const emit = defineEmits(['login'])

const login = async () => {
  if (await userStore.login(form.value)) {
    // toast.success('User ' + userStore.user.name + ' has entered the application.')
    console.log(`User "${userStore.user.name}" has entered the application.`)
    emit('login')
    router.push('/')
  } else {
    form.value.password = ''
    // toast.error('User credentials are invalid!')
    console.log('User credentials are invalid!')
  }
}

// const submit = () => {
//   router.push('/dashboard')
// }
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            autocomplete="email"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <!-- <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        /> -->

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
