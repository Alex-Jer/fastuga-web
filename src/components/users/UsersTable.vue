<script setup>
import { useToast } from 'vue-toastification'
import { mdiBlockHelper, mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js'
import { computed, inject, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import ConfirmModal from './ConfirmModal.vue'
import EmployeeModal from './EmployeeModal.vue'
import CustomerModal from './CustomerModal.vue'

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  types: {
    type: Array,
    default: () => [],
  },
})

const apiDomain = inject('apiDomain')
const users = computed(() => props.users)
const toast = useToast()

const modalData = ref({
  showAddToCartModal: false,
  showCustomerDetailsModal: false,
  showEmployeeDetailsModal: false,
  showUpdateModal: false,
  showDeleteModal: false,
  showBlockModal: false,
  user: {},
  user_id: '',
  action: '',
})

const itemsPerPage = ref(8)
const currentPage = ref(0)

const itemsPaginated = computed(() =>
  users.value.slice(itemsPerPage.value * currentPage.value, itemsPerPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(users.value.length / itemsPerPage.value))

const pagesList = computed(() => {
  const list = []
  for (let i = 0; i < numPages.value; i += 1) list.push(i)
  return list
})

/* Modals */
const showAddToCartModal = (user) => {
  modalData.value = { showAddToCartModal: true, user }
}

const showDetailsModal = (user) => {
  if (user.customer) modalData.value = { showCustomerDetailsModal: true, user }
  else modalData.value = { showEmployeeDetailsModal: true, user }
}

const showUpdateModal = (user) => {
  if (user.customer) return toast.error('This user is a customer!')
  modalData.value = { showUpdateModal: true, user }
}

const showDeleteModal = (user) => {
  modalData.value = { showDeleteModal: true, user }
}

const showBlockModal = (user) => {
  modalData.value = { showBlockModal: true, user }
}
/* End of Modals */

const generateAvatar = (name) => {
  // 'https://ui-avatars.com/api/?name=John+Doe'
  // convert spaces to +
  const nameWithPlus = name.replace(/ /g, '+')
  return `https://avatar.oxro.io/avatar.svg?name=${nameWithPlus}&bold=true&width=60&height=60&fontSize=20&background=3b82f6&color=ffffff`
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <EmployeeModal
      v-model="modalData.showEmployeeDetailsModal"
      :user="modalData.user"
      :types="props.types"
      :title="`Viewing User #${modalData.user.user_id}`"
      action="view"
    />

    <CustomerModal
      v-model="modalData.showCustomerDetailsModal"
      :user="modalData.user"
      :types="props.types"
      :title="`Viewing User #${modalData.user.user_id}`"
      action="view"
    />

    <EmployeeModal
      v-model="modalData.showUpdateModal"
      :user="modalData.user"
      :types="props.types"
      :title="`Updating User #${modalData.user.user_id}`"
      action="update"
    />

    <ConfirmModal v-model="modalData.showDeleteModal" :user="modalData.user" is-delete>
      <p>
        Are you sure you want to delete the user
        <b>{{ modalData.user.name }}</b
        >?
      </p>
    </ConfirmModal>

    <ConfirmModal v-model="modalData.showBlockModal" :user="modalData.user" is-block>
      <p>
        Are you sure you want to block the user
        <b>{{ modalData.user.name }}</b
        >?
      </p>
    </ConfirmModal>

    <table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Type</th>
          <th>Blocked</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in itemsPaginated" :key="user.user_id" class="cursor-pointer" @click="showDetailsModal(user)">
          <td class="border-b-0 lg:w-6 before:hidden">
            <div class="w-24 h-24 mx-auto lg:w-10 lg:h-10">
              <img
                :src="user.photo_url ? `${apiDomain}/storage/fotos/${user.photo_url}` : generateAvatar(user.name)"
                :alt="user.name"
                :title="user.name"
                class="w-full h-full bg-gray-100 rounded-full dark:bg-slate-800"
              />
            </div>
          </td>
          <td data-label="Name">
            {{ user.name }}
          </td>
          <td data-label="Type">
            {{ user.type }}
          </td>
          <td data-label="Blocked">{{ user.blocked ? 'Yes' : 'No' }}</td>
          <td class="before:hidden lg:w-1 whitespace-nowrap" v-if="$route.name === 'users'">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiPencil"
                small
                @click.stop="showUpdateModal(user)"
                :disabled="user.customer"
              />
              <BaseButton color="white" :icon="mdiBlockHelper" small @click.stop="showBlockModal(user)" />
              <BaseButton color="danger" :icon="mdiTrashCan" small @click.stop="showDeleteModal(user)" />
            </BaseButtons>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap" v-if="$route.name === 'home'">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :icon="mdiPlus" small @click.stop="showAddToCartModal(user)" />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPage + 1 }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </CardBox>
</template>
