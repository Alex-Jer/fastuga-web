<!-- eslint-disable max-len -->
<template>
  <!-- this header -->
  <header class="p-2 bg-white border-b-2 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-wrap items-center justify-between wrap-header">
      <div class="flex items-center flex-no-shrink">
        <button class="block ml-3 text-gray-500 lg:hidden" @click="sidebarToggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="2em"
            height="2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
            />
          </svg>
        </button>
        <h2 class="hidden p-2 px-5 ml-3 text-indigo-800 bg-indigo-200 rounded-md text-md lg:block">
          Welcome back, Mohammad Sahrullah
        </h2>
      </div>
      <div class="flex mr-5">
        <div
          class="box-border hidden w-full mr-5 border rounded-md input-box dark:bg-gray-900 dark:border-gray-700 lg:w-search lg:flex md:flex focus-within:bg-gray-100 dark:focus-within:bg-gray-700"
        >
          <span class="p-2 text-3xl text-gray-400"><Icon icon="ei:search" /></span>
          <input
            type="text"
            placeholder="Search..."
            class="w-full p-3 bg-white rounded-md outline-none dark:bg-gray-900 focus:bg-gray-100 dark:focus:bg-gray-700"
          />
        </div>
        <button
          id="theme-toggle"
          type="button"
          class="text-gray-500 mr-5 dark:text-gray-400 h outline-none rounded-lg text-sm p-2.5"
        >
          <svg
            id="theme-toggle-light-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            id="theme-toggle-dark-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <button class="mr-5 text-2xl text-gray-500">
          <Icon icon="clarity:notification-line" />
        </button>
        <button @click="menuToggle" @blur="menuToggleBlur">
          <div class="flex p-1 rounded-md cursor-pointer user-avatar hover:bg-gray-100 dark:hover:bg-gray-700">
            <img
              src="../assets/img/user.jpg"
              class="w-10 h-10 p-1 mr-4 rounded-full ring-1 ring-gray-300 dark:ring-gray-500"
              alt=""
            />
            <span class="mt-4 text-gray-300 text-md"><Icon icon="bi:caret-down-fill" /></span>
          </div>
        </button>

        <transition name="fade">
          <div
            id="dropdownSmall"
            v-show="menu"
            class="absolute z-10 block mt-12 bg-white border divide-y divide-gray-100 rounded shadow right-10 w-44 dark:border-gray-700 dark:bg-gray-800 dark:divide-gray-700"
          >
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
              <div>Logged As</div>
              <div class="font-medium truncate">Moh Sahrullah</div>
            </div>
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSmallButton">
              <li>
                <a href="#" class="block px-4 py-2 0 hover:bg-primary hover:text-white">User Profile</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-primary hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-primary hover:text-white">Github</a>
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
                >Sign out</a
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  data() {
    return {
      menu: false,
    }
  },
  components: {
    Icon,
  },
  methods: {
    menuToggle() {
      this.menu = !this.menu
    },
    menuToggleBlur() {
      this.menu = false
    },
    sidebarToggle() {
      document.querySelector('.flex-sidebar').classList.remove('hidden')
    },
  },
  mounted() {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || !('color-theme' in localStorage)) {
      document.documentElement.classList.add('dark')
      themeToggleLightIcon.classList.remove('hidden')
    } else {
      document.documentElement.classList.remove('dark')
      themeToggleDarkIcon.classList.remove('hidden')
    }

    // // if set via local storage previously
    // if (!localStorage.getItem("color-theme")) {
    //   if (localStorage.getItem("color-theme") === "light") {
    //     document.documentElement.classList.add("dark");
    //     localStorage.setItem("color-theme", "dark");
    //   } else {
    //     document.documentElement.classList.remove("dark");
    //     localStorage.setItem("color-theme", "light");
    //   }

    // if NOT set via local storage previously
    // } else {
    //   if (document.documentElement.classList.contains("dark")) {
    //     document.documentElement.classList.remove("dark");
    //     localStorage.setItem("color-theme", "light");
    //   } else {
    //     document.documentElement.classList.add("dark");
    //     localStorage.setItem("color-theme", "dark");
    //   }
    // }

    const themeToggleBtn = document.getElementById('theme-toggle')

    themeToggleBtn.addEventListener('click', () => {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden')
      themeToggleLightIcon.classList.toggle('hidden')

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        }

        // if NOT set via local storage previously
      } else if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      }
    })
  },
}
</script>
