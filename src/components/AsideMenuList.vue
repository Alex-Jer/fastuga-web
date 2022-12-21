<script setup>
import { mdiAccount, mdiAccountGroupOutline, mdiClipboardListOutline, mdiFoodAppleOutline, mdiMonitor } from '@mdi/js'
import { useUserStore } from '@/stores/user'
import BaseIcon from './BaseIcon.vue'

const userStore = useUserStore()

defineProps({
  isDropdownList: Boolean,
  menu: {
    type: Array,
    required: true,
  },
})

// const emit = defineEmits(['menu-click'])

// const menuClick = (event, item) => {
//   emit('menu-click', event, item)
// }
</script>

<template>
  <ul>
    <li>
      <router-link to="/">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'home' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiClipboardListOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Menu</span>
        </div>
      </router-link>
    </li>

    <li v-show="userStore.user?.type === 'EM'">
      <router-link to="/products">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'products' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiFoodAppleOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Products</span>
        </div>
      </router-link>
    </li>

    <li v-show="userStore.user?.type === 'EM'">
      <router-link to="/users">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'users' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiAccountGroupOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Users</span>
        </div>
      </router-link>
    </li>

    <li>
      <router-link to="/profile">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'profile' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiAccount" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Profile</span>
        </div>
      </router-link>
    </li>

    <li>
      <router-link to="/dashboard">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'dashboard' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiMonitor" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Dashboard</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>
