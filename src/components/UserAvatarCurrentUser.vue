<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <img
    :src="userStore.userPhotoUrl"
    :alt="userStore.user?.name"
    class="block object-fill bg-gray-100 rounded-full dark:bg-slate-800"
  />
</template>
