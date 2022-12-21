<script setup>
import { mdiClipboardTextClockOutline, mdiFoodApple, mdiReceiptText } from '@mdi/js'
import { onMounted, ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import IconRounded from '@/components/IconRounded.vue'
import OrderDetailsTable from '@/components/orders/OrderDetailsTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLine from '@/components/SectionTitleLine.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { axiosReq } from '@/requestHelper'
import { useUserStore } from '@/stores/user'

const { params } = useRoute()
const userStore = useUserStore()
const moment = inject('moment')
const apiDomain = inject('apiDomain')

const order = ref({})

const statuses = {
  D: 'Delivered',
  C: 'Cancelled',
  P: 'Pending',
}

const detailsForm = ref({
  customer_name: '',
  status: '',
  date: '',
  total_price: '',
  total_paid: '',
  total_paid_with_points: '',
  points_gained: '',
  points_used_to_pay: '',
  delivered_by: '',
  cancel_reason: '',
})

const fillDetailsForm = (orderToFill) => {
  /* eslint-disable no-param-reassign */
  orderToFill.status = statuses[orderToFill.status]
  orderToFill.date = moment(orderToFill.date).format('DD/MM/YYYY HH:mm')
  orderToFill.total_price = `${orderToFill.total_price} €`
  orderToFill.total_paid = `${orderToFill.total_paid} €`
  orderToFill.total_paid_with_points = `${orderToFill.total_paid_with_points} €`

  Object.keys(detailsForm.value).forEach((key) => {
    detailsForm.value[key] = orderToFill[key]
  })
}

const getProfilePicture = (photoUrl, name) => {
  const nameWithPlus = name.replace(' ', '+')
  if (photoUrl) return `${apiDomain}/storage/fotos/${photoUrl}`
  return `https://avatar.oxro.io/avatar.svg?name=${nameWithPlus}&bold=true&width=60&height=60&fontSize=20&background=3b82f6&color=ffffff`
}

onMounted(async () => {
  let response
  if (userStore.user.type === 'C')
    response = await axiosReq(`orders/me/${params.id}`, 'GET').catch((error) => console.log(error))
  else response = await axiosReq(`orders/${params.id}`, 'GET').catch((error) => console.log(error))
  order.value = response.data.data
  fillDetailsForm(order.value)
})
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <section class="mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <IconRounded :icon="mdiClipboardTextClockOutline" color="light" class="mr-3" bg />
          <div class="text-3xl leading-tight">
            <span class="font-semibold"> Ticket #{{ order.ticket_number }} </span>
            <span class="text-2xl"> (ref: #{{ order.id }}) </span>
          </div>
        </div>
      </section>
      <!-- End of header -->

      <!-- Order details -->
      <SectionTitleLine :icon="mdiReceiptText" title="Order details" />

      {{ detailsForm.cancel_reason }}
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CardBox>
          <FormField label="Customer" v-if="userStore.user.type !== 'C' && order.customer_name">
            <div class="grid grid-cols-6 gap-0">
              <div class="col-span-5">
                <FormControl v-model="detailsForm.customer_name" :icon="mdiAsterisk" disabled />
              </div>
              <div class="mx-auto w-11 h-11">
                <img
                  :src="getProfilePicture(order.customer_photo_url, order.customer_name)"
                  class="w-full h-full bg-gray-100 rounded-full dark:bg-slate-800"
                />
              </div>
            </div>
          </FormField>

          <FormField label="Status">
            <FormControl v-model="detailsForm.status" :icon="mdiFormTextboxPassword" disabled />
          </FormField>

          <FormField label="Delivered by" v-if="userStore.user.type === 'EM'">
            <FormControl v-model="detailsForm.delivered_by" :icon="mdiFormTextboxPassword" disabled />
          </FormField>

          <FormField label="Cancellation reason" v-if="userStore.user.type === 'EM'">
            <FormControl v-model="detailsForm.cancel_reason" type="textarea" disabled />
          </FormField>
        </CardBox>

        <CardBox>
          <FormField label="Total paid & Total paid with points">
            <FormControl v-model="detailsForm.total_paid" :icon="mdiFormTextboxPassword" disabled />
            <FormControl v-model="detailsForm.total_paid_with_points" :icon="mdiFormTextboxPassword" disabled />
          </FormField>

          <FormField label="Total price & Date">
            <FormControl v-model="detailsForm.total_price" :icon="mdiFormTextboxPassword" disabled />
            <FormControl v-model="detailsForm.date" :icon="mdiFormTextboxPassword" disabled />
          </FormField>

          <FormField label="Points gained & Points used to pay">
            <FormControl v-model="detailsForm.points_gained" :icon="mdiFormTextboxPassword" disabled />
            <FormControl v-model="detailsForm.points_used_to_pay" :icon="mdiFormTextboxPassword" disabled />
          </FormField>
        </CardBox>
      </div>
      <!-- End of order details -->

      <!-- Products table -->
      <div class="-mb-2">
        <SectionTitleLine :icon="mdiFoodApple" title="Products bought" />
      </div>

      <order-details-table :order="order" />
      <!-- End of Products Table -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
