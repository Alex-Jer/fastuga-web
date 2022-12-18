<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '../../stores/user.js'

const router = useRouter()
const userStore = useUserStore()
const props = defineProps(['redirectTo'])

onMounted(async () => {
  await userStore.restoreToken()
  if (props.redirectTo) router.push(props.redirectTo)
})
</script>

<template>
  <div
    class="grid h-screen place-items-center bg-slate-800 text-slate-100 text-3xl"
  >
    Redirecting...
  </div>
</template>
