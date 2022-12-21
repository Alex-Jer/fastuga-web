<script setup>
import { mdiAccountPlusOutline, mdiChevronDown, mdiChevronUp, mdiLogin } from '@mdi/js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import NavBarMenuList from '@/components/NavBarMenuList.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import { useStyleStore } from '@/stores/style.js'
import { useUserStore } from '@/stores/user.js'
import BaseButton from './BaseButton.vue'

const userStore = useUserStore()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['menu-click'])

const is = computed(() => {
  if (props.item.href) {
    return 'a'
  }

  if (props.item.to) {
    return RouterLink
  }

  return 'div'
})

const styleStore = useStyleStore()

const isDropdownActive = ref(false)

const componentClass = computed(() => {
  const base = [
    isDropdownActive.value
      ? `${styleStore.navBarItemLabelActiveColorStyle} dark:text-slate-400`
      : `${styleStore.navBarItemLabelStyle} dark:text-white dark:hover:text-slate-400 ${styleStore.navBarItemLabelHoverStyle}`,
    props.item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
  ]

  if (props.item.isDesktopNoLabel) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})

const itemLabel = computed(() => (props.item.isCurrentUser ? useUserStore().user?.name : props.item.label))

const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value
  }
}

const menuClickDropdown = (event, item) => {
  emit('menu-click', event, item)
}

const root = ref(null)

const forceClose = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    isDropdownActive.value = false
  }
}

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener('click', forceClose)
  }
})

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener('click', forceClose)
  }
})
</script>

<template>
  <BaseDivider v-if="item.isDivider" nav-bar />
  <component
    :is="is"
    v-else
    ref="root"
    class="relative items-center block cursor-pointer lg:flex"
    :class="componentClass"
    :to="item.to ?? null"
    :href="item.href ?? null"
    :target="item.target ?? null"
    @click="menuClick"
  >
    <div
      class="flex items-center"
      :class="{
        'bg-gray-100 dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent p-3 lg:p-0': item.menu,
      }"
    >
      <UserAvatarCurrentUser v-if="userStore.user && item.isCurrentUser" class="inline-flex w-6 h-6 mr-3" />
      <BaseIcon v-if="item.icon" :path="item.icon" class="transition-colors" />
      <span v-if="!userStore.user" class="inline-flex items-center justify-center space-x-2">
        <router-link to="register">
          <BaseButton :icon="mdiAccountPlusOutline" color="whiteDark" small label="Register" rounded-full />
        </router-link>
        <router-link to="login">
          <BaseButton :icon="mdiLogin" color="whiteDark" small label="Login" rounded-full />
        </router-link>
      </span>
      <span
        v-if="userStore.user"
        class="px-2 transition-colors"
        :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
      >
        {{ itemLabel }}
      </span>
      <BaseIcon
        v-if="item.menu && userStore.user"
        :path="isDropdownActive ? mdiChevronUp : mdiChevronDown"
        class="hidden transition-colors lg:inline-flex"
      />
    </div>
    <div
      v-if="item.menu && userStore.user"
      class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700"
      :class="{ 'lg:hidden': !isDropdownActive }"
    >
      <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
    </div>
  </component>
</template>
