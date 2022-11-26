<!-- eslint-disable max-len -->
<template>
  <!-- Search component Alert with name of type,  press Ctrl + F -->

  <div class="h-auto p-3 alert">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              ></path>
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <a
              href="#"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >Components</a
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <a
              href="#"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >Alert</a
            >
          </div>
        </li>
      </ol>
    </nav>
    <!-- end nav -->
    <div class="w-full mt-5">
      <h1 class="text-2xl font-medium text-gray-900 dark:text-gray-200">Alert</h1>
      <p class="mt-1 text-sm font-normal text-gray-400">
        This Alert component helps you to notify about success and danger messages.
      </p>
    </div>
    <!-- grid wrapper card -->
    <div class="grid gap-4 mt-5 lg:grid-cols-2 grid-col-1">
      <!-- default alert  -->
      <div class="w-full p-5 bg-white rounded-md shadow card dark:bg-gray-800">
        <h2 class="dark:text-gray-200">Default</h2>
        <div class="grid grid-cols-1 gap-3 mt-3 wrapper-alert">
          <div class="box-border w-full px-5 py-3 text-white bg-blue-500 rounded-md primary-alert">
            Hello iam primary and can also info alert
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-green-500 rounded-md success-alert">
            Hello iam alert success
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-orange-500 rounded-md warning-alert">
            Hello iam alert warning
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-red-500 rounded-md danger-alert">
            Hello iam alert danger
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-gray-800 rounded-md dark-alert">
            Hello iam alert dark
          </div>
          <div class="box-border w-full px-5 py-3 text-gray-800 bg-gray-300 rounded-md secondary-alert">
            Hello iam alert secondary
          </div>
          <div class="box-border w-full px-5 py-3 text-gray-800 bg-gray-100 rounded-md light-alert">
            Hello iam alert light
          </div>
          <div class="box-border w-full px-5 py-3 text-white rounded-md light-alert bg-primary">
            Hello iam alert custom colors
          </div>
        </div>
      </div>
      <!-- heading alert  -->
      <div class="w-full row-span-2 p-5 bg-white rounded-md shadow card dark:bg-gray-800">
        <h2 class="dark:text-gray-200">Heading</h2>
        <div class="grid grid-cols-1 gap-3 mt-3 wrapper-alert">
          <div class="box-border w-full px-5 py-3 text-white bg-blue-500 rounded-md primary-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam primary and can also info alert
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-green-500 rounded-md success-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert success
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-orange-500 rounded-md warning-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert warning
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-red-500 rounded-md danger-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert danger
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-gray-800 rounded-md dark-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert dark
          </div>
          <div class="box-border w-full px-5 py-3 text-gray-800 bg-gray-300 rounded-md secondary-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert secondary
          </div>
          <div class="box-border w-full px-5 py-3 text-gray-800 bg-gray-100 rounded-md light-alert">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert light
          </div>
          <div class="box-border w-full px-5 py-3 text-white rounded-md light-alert bg-primary">
            <h1 class="text-xl font-bold">Windzo</h1>
            Hello iam alert custom colors
          </div>
        </div>
      </div>
      <!-- With icon alert -->
      <div class="w-full row-span-3 p-5 bg-white rounded-md shadow card dark:bg-gray-800">
        <h2 class="dark:text-gray-200">With icon alert</h2>
        <div class="grid grid-cols-1 gap-3 mt-3 wrapper-alert">
          <div class="box-border flex w-full px-5 py-3 text-white bg-blue-500 rounded-md primary-alert">
            <span class="mr-3 text-2xl">
              <Icon icon="bytesize:info" />
            </span>
            <span> Hello iam primary and can also info alert </span>
          </div>
          <div class="box-border flex w-full px-5 py-3 text-white bg-green-500 rounded-md success-alert">
            <span class="mr-3 text-2xl">
              <Icon icon="bi:check-circle" />
            </span>
            <span> Hello iam alert success </span>
          </div>
          <div class="box-border flex w-full px-5 py-3 text-white bg-orange-500 rounded-md warning-alert">
            <span class="mr-3 text-2xl">
              <Icon icon="clarity:warning-line" />
            </span>
            <span> Hello iam alert warning </span>
          </div>
          <div class="box-border flex w-full px-5 py-3 text-white bg-red-500 rounded-md danger-alert">
            <span class="mr-3 text-2xl">
              <Icon icon="ic:outline-dangerous" />
            </span>
            <span> Hello iam alert danger </span>
          </div>
          <div class="box-border flex w-full px-5 py-3 text-white bg-gray-800 rounded-md dark-alert">
            <span class="mr-3 text-2xl">
              <Icon icon="bxs:moon" />
            </span>
            <span> Hello iam alert dark </span>
          </div>
          <div
            class="box-border flex w-full px-5 py-3 text-gray-800 bg-gray-300 rounded-md secondary-alert dark:bg-gray-800"
          >
            <span class="mr-3 text-2xl">
              <Icon icon="bx:cog" />
            </span>
            <span> Hello iam alert secondary </span>
          </div>
          <div class="box-border flex w-full px-5 py-3 text-gray-800 bg-gray-100 rounded-md light-alert">
            <span class="mr-3 text-2xl">
              <Icon icon="ci:sun" />
            </span>
            <span> Hello iam alert light </span>
          </div>
          <div class="box-border flex w-full px-5 py-3 text-white rounded-md light-alert bg-primary">
            <span class="mr-3 text-2xl">
              <Icon icon="cib:visual-studio-code" />
            </span>
            <span> Hello iam alert custom colors </span>
          </div>
        </div>
      </div>
      <!-- Dismis alert  -->
      <div class="w-full row-span-4 p-5 bg-white rounded-md shadow card dark:bg-gray-800">
        <h2 class="dark:text-gray-200">Dismissable Alert</h2>
        <div class="grid grid-cols-1 gap-3 mt-3 wrapper-alert">
          <div class="box-border w-full px-5 py-3 text-white bg-blue-500 rounded-md primary-alert">
            Hello iam primary and can also info alert
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-green-500 rounded-md success-alert">
            Hello iam alert success
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-orange-500 rounded-md warning-alert">
            Hello iam alert warning
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-red-500 rounded-md danger-alert">
            Hello iam alert danger
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-white bg-gray-800 rounded-md dark-alert">
            Hello iam alert dark
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-gray-800 bg-gray-300 rounded-md secondary-alert">
            Hello iam alert secondary
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-gray-800 bg-gray-100 rounded-md light-alert">
            Hello iam alert light
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
          <div class="box-border w-full px-5 py-3 text-white rounded-md light-alert bg-primary">
            Hello iam alert custom colors
            <button class="float-right text-2xl alert-dismiss">
              <Icon icon="la:times" />
            </button>
          </div>
        </div>
      </div>
      <!-- Light alert  -->
      <div class="w-full row-span-4 p-5 bg-white rounded-md shadow card dark:bg-gray-800">
        <h2 class="dark:text-gray-200">Light alert</h2>
        <div class="grid grid-cols-1 gap-3 mt-3 wrapper-alert">
          <div
            class="box-border w-full px-5 py-3 text-blue-800 bg-blue-200 border-2 border-blue-800 rounded-md primary-alert"
          >
            Hello iam primary and can also info alert
          </div>
          <div
            class="box-border w-full px-5 py-3 text-green-800 bg-green-200 border-2 border-green-800 rounded-md success-alert"
          >
            Hello iam alert success
          </div>
          <div
            class="box-border w-full px-5 py-3 text-orange-800 bg-orange-200 border-2 border-orange-800 rounded-md warning-alert"
          >
            Hello iam alert warning
          </div>
          <div
            class="box-border w-full px-5 py-3 text-red-800 bg-red-200 border-2 border-red-800 rounded-md danger-alert"
          >
            Hello iam alert danger
          </div>
          <div
            class="box-border w-full px-5 py-3 text-gray-800 bg-gray-200 border-2 border-gray-800 rounded-md dark-alert"
          >
            Hello iam alert dark
          </div>
          <div
            class="box-border w-full px-5 py-3 text-gray-500 bg-gray-300 border-2 border-gray-500 rounded-md secondary-alert"
          >
            Hello iam alert secondary
          </div>
          <div
            class="box-border w-full px-5 py-3 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded-md light-alert"
          >
            Hello iam alert light
          </div>
          <div
            class="box-border w-full px-5 py-3 text-indigo-800 bg-indigo-200 border-2 border-indigo-800 rounded-md light-alert"
          >
            Hello iam alert custom colors
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  components: {
    Icon,
  },
  mounted() {
    const alertDis = document.querySelectorAll('.alert-dismiss')
    alertDis.forEach((x) => x.addEventListener('click', () => {
      x.parentElement.classList.add('hidden')
    }))
  },
}
</script>
