<script setup>
import { mdiClose } from '@mdi/js'
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useUsersStore } from '@/stores/users'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  user: {
    type: Object,
    default: null,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isBlocking: {
    type: Boolean,
    default: false,
  },
  isUnblocking: {
    type: Boolean,
    default: false,
  },
})

const toast = useToast()

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

const deleteUser = () => {
  const usersStore = useUsersStore()
  usersStore
    .deleteUser(props.user)
    .then((res) => {
      if (res.status === 200) toast.success('User was deleted successfully!')
    })
    .catch((error) => {
      if (error.status === 404) toast.error('User was not found!')
      if (error.status === 422) toast.error(error.data.message)
      if (error.status !== 404 && error.status !== 422)
        toast.error('User was not deleted due to an unknown server error!')
    })
  cancel()
}

const toggleBlockUser = () => {
  const usersStore = useUsersStore()

  if (!props.user.blocked) {
    usersStore
      .blockUser(props.user.user_id)
      .then((res) => {
        if (res.status === 200) toast.success('User was blocked successfully!')
        cancel()
      })
      .catch((error) => {
        if (error.status === 404) toast.error('User was not found!')
        if (error.status === 422) toast.error(error.data.message)
        if (error.status !== 404 && error.status !== 422)
          toast.error('User was not blocked due to an unknown server error!')
      })
    return
  }

  usersStore
    .unblockUser(props.user.user_id)
    .then((res) => {
      if (res.status === 200) toast.success('User was unblocked successfully!')
      cancel()
    })
    .catch((error) => {
      if (error.status === 404) toast.error('User was not found!')
      if (error.status === 422) toast.error(error.data.message)
      if (error.status !== 404 && error.status !== 422)
        toast.error('User was not unblocked due to an unknown server error!')
    })
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) cancel()
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle v-if="props.isDelete" :title="`Delete user #${user.user_id}?`">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBoxComponentTitle v-if="props.isBlocking" :title="`Block user #${user.user_id}?`">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBoxComponentTitle v-if="props.isUnblocking" :title="`Unblock user #${user.user_id}?`">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton v-if="props.isDelete" label="Delete" color="danger" @click="deleteUser" />
          <BaseButton v-if="props.isBlocking" label="Block" color="danger" @click="toggleBlockUser" />
          <BaseButton v-if="props.isUnblocking" label="Unblock" color="info" @click="toggleBlockUser" />
          <BaseButton label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
