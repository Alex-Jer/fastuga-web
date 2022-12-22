<script setup>
import { mdiClose } from '@mdi/js'
import AsideMenuList from '@/components/AsideMenuList.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useStyleStore } from '@/stores/style.js'

defineProps({
  menu: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const styleStore = useStyleStore()

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside id="aside" class="fixed top-0 z-40 flex h-screen overflow-hidden lg:py-2 lg:pl-2 w-60 transition-position">
    <div :class="styleStore.asideStyle" class="flex flex-col flex-1 overflow-hidden lg:rounded-2xl dark:bg-slate-900">
      <div
        :class="styleStore.asideBrandStyle"
        class="flex flex-row items-center justify-between h-14 dark:bg-slate-900"
      >
        <div class="flex-1 text-center lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b class="font-black">FasTuga</b>
        </div>
        <button class="hidden p-3 lg:inline-block xl:hidden" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        :class="styleStore.darkMode ? 'aside-scrollbars-[slate]' : styleStore.asideScrollbarsStyle"
        class="flex-1 overflow-x-hidden overflow-y-auto"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>
    </div>
  </aside>
</template>
