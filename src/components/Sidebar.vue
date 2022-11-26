<!-- eslint-disable max-len -->
<template>
  <!-- sidebar -->
  <nav class="bg-white sidebar dark:bg-gray-800">
    <!-- sidebar head -->
    <div class="p-4 sidebar-head">
      <router-link to="/" exact>
        <h2 class="text-2xl font-normal text-gray-800 dark:text-gray-500" translate="no">
          Windzo<span class="text-primary">.</span>
          <span class="absolute hidden px-2 py-1 mt-2 text-xs text-gray-200 bg-gray-700 rounded-md dark:block"
            >Dark mode</span
          >
        </h2>
      </router-link>
      <button class="block float-right lg:hidden -mt-7" @click="sidebarToggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="25px"
          height="25px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
          />
        </svg>
      </button>
    </div>
    <!-- sidebar list -->
    <div class="p-4 mt-4 sidebar-list">
      <p class="font-medium text-gray-400 dark:text-gray-600">Menu</p>
      <div class="mt-4 wrap-item dark:text-gray-500">
        <div class="item">
          <router-link
            to="/"
            exact
            class="box-border flex w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span class="mr-3 text-xl"><Icon icon="bxs:dashboard" /></span>
            <span class="w-full"> Dashboard </span>
          </router-link>
        </div>
        <div class="mt-3 item">
          <menu-accordion>
            <template v-slot:icon>
              <Icon icon="gg:components" />
            </template>
            <template v-slot:title> Components </template>
            <template v-slot:content>
              <router-link
                to="/component/alert"
                class="block w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Alert
              </router-link>
              <router-link
                to="/component/accordion"
                class="block w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Accordion
              </router-link>
              <router-link
                to="/component/badge"
                class="block w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Badge
              </router-link>
              <router-link
                to="/component/breadcumb"
                class="block w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Breadcumb
              </router-link>
              <router-link
                to="/component/button"
                class="block w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Button
              </router-link>
              <router-link
                to="/component/card"
                class="block w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Card
              </router-link>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dropdown</button>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                List Group
              </button>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Modal</button>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Nav</button>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                Pagination
              </button>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Progress</button>
            </template>
          </menu-accordion>
        </div>
        <div class="mt-3 item">
          <menu-accordion>
            <template v-slot:icon>
              <Icon icon="bi:layout-wtf" />
            </template>
            <template v-slot:title> Layouts </template>
            <template v-slot:content>
              <button class="w-full p-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                Coming Soon
              </button>
            </template>
          </menu-accordion>
        </div>
      </div>
      <p class="mt-4 font-medium text-gray-400 dark:text-gray-600">UI Form & Tables</p>

      <div class="mt-3 item">
        <menu-accordion>
          <template v-slot:icon>
            <Icon icon="ant-design:form-outlined" />
          </template>
          <template v-slot:title> Form Element </template>
          <template v-slot:content> </template>
        </menu-accordion>
      </div>

      <div class="mt-3 item">
        <menu-accordion>
          <template v-slot:icon>
            <Icon icon="mdi:form-textbox" />
          </template>
          <template v-slot:title> Form Editor </template>
          <template v-slot:content> </template>
        </menu-accordion>
      </div>
      <div class="mt-3 item">
        <router-link to="/">
          <button
            class="box-border flex w-full p-3 text-left text-gray-800 bg-transparent rounded-md dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span class="mr-3 text-xl"><Icon icon="bi:table" /></span>
            <span class="w-full"> Table </span>
            <span class="box-border mt-1 text-gray-500"> </span>
          </button>
        </router-link>
      </div>
      <div class="mt-3 item">
        <router-link to="/">
          <button
            class="box-border flex w-full p-3 text-left text-gray-800 bg-transparent rounded-md dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span class="mr-3 text-xl"><Icon icon="carbon:data-table" /></span>
            <span class="w-full"> DataTables </span>
            <span class="box-border mt-1 text-gray-500"> </span>
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>
<style>
.active {
}
</style>
<script>
import { Icon } from '@iconify/vue'
import MenuAccordion from './MenuAccordion.vue'

export default {
  components: {
    Icon,
    MenuAccordion,
  },
  methods: {
    sidebarToggle() {
      document.querySelector('.flex-sidebar').classList.add('hidden')
    },
  },
  mounted() {},
}
</script>
