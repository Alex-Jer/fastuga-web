<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import { useUserStore } from '@/stores/user.js'


const credentials = ref({
    username: '',
    password: '',
    confirmpassword: ''
})
const saveCustomer = ref({
    phone: '',
    points: 0,
    nif: '',
    default_payment_type: '',
    default_payment_reference: '',
    custom: null,
    name: '',
    email: '',
    password: '',
    type: 'C',
    blocked: 0,
    photo_url: null
})
const customer = ref(saveCustomer)
const errors = ref(null)
const emit = defineEmits(['register'])
const dataAsString = () => {
    return JSON.stringify(customer.value)
}

const saveCostumer = async () => {
    errors.value = null
    if(credentials.value.password == credentials.value.confirmpassword){
        let formData = new FormData()
        formData.append('phone', saveCustomer.value.phone);
        formData.append('points', saveCustomer.value.points);
        formData.append('nif', saveCustomer.value.nif);
        formData.append('default_payment_type', saveCustomer.value.default_payment_type);
        formData.append('default_payment_reference', saveCustomer.value.default_payment_reference);
        formData.append('name', saveCustomer.value.name);
        formData.append('email', credentials.value.username);
        formData.append('password', credentials.value.password);
        formData.append('type', saveCustomer.value.type);
        formData.append('blocked', saveCustomer.value.blocked);
        if (await userStore.register(formData)) {
          toast.clear()
          emit('login')
        } else {
          toast.clear()
          toast.error('Error creating user!')
        }
        
    } else {
        toast.error("The passwords aren't matching.")
    }
}
const register = () => {
    saveCostumer()
    emit('register')
}
</script>

<template>
<LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Forms example"
        main
      >
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="login">
         <FormField label="Name" >
          <FormControl
            v-model="saveCustomer.name"
            type="text"
            placeholder="Enter your name"
          />
        </FormField>
        <FormField label="Email" >
          <FormControl
            v-model="credentials.username"
            type="email"
            placeholder="Enter your email"
          />
        </FormField>
        <FormField label="Phone number" >
          <FormControl
            v-model="saveCustomer.phone"
            type="tel"
            placeholder="Your phone number"
          />
        </FormField>
        <FormField label="Password" >
          <FormControl
            v-model="credentials.password"
            type="password"
            placeholder="Enter your password"
          />
        </FormField>
        <FormField label="Confirm password" >
          <FormControl
            v-model="credentials.confirmpassword"
            type="password"
            placeholder="Confirm your password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="register" @click="register" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
</LayoutAuthenticated>
</template>