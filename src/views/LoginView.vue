<script setup>
import { mdiAccount, mdiAsterisk } from '@mdi/js'
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

const form = ref({
  email: 'manager_1@mail.pt',
  password: '123',
})

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const emit = defineEmits(['login'])

const login = async () => {
  toast.info('Logging in...')
  if (await userStore.login(form.value)) {
    toast.clear()
    emit('login')
    router.push('/')
  } else {
    toast.clear()
    form.value.password = ''
    toast.error('User credentials are invalid!')
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <FormField label="Login" help="Please enter your login">
          <FormControl v-model="form.email" :icon="mdiAccount" name="login" autocomplete="email" />
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

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
