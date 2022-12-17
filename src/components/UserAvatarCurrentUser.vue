<script setup>
import UserAvatar from '@/components/UserAvatar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <UserAvatar :username="userStore.user?.name" :avatar="userStore.userPhotoUrl">
    <slot />
  </UserAvatar>
</template>
