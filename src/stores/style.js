import { defineStore } from 'pinia'
import { basic as styleDefault } from '@/styles.js'
import { darkModeKey } from '@/config.js'

export const useStyleStore = defineStore('style', {
  state: () => ({
    /* Styles */
    asideStyle: '',
    asideScrollbarsStyle: '',
    asideBrandStyle: '',
    asideMenuItemStyle: '',
    asideMenuItemActiveStyle: '',
    asideMenuDropdownStyle: '',
    navBarItemLabelStyle: '',
    navBarItemLabelHoverStyle: '',
    navBarItemLabelActiveColorStyle: '',
    overlayStyle: '',

    /* Dark mode */
    darkMode: true,
  }),
  actions: {
    setStyle() {
      // for (const key in styleDefault) {
      //   this[`${key}Style`] = styleDefault[key]
      // }

      // for..in loops iterat over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.

      Object.keys(styleDefault).forEach((key) => {
        this[`${key}Style`] = styleDefault[key]
      })
    },

    setDarkMode(payload = null) {
      this.darkMode = payload !== null ? payload : !this.darkMode

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(darkModeKey, this.darkMode ? '1' : '0')
      }

      if (typeof document !== 'undefined') {
        document.body.classList[this.darkMode ? 'add' : 'remove'](
          'dark-scrollbars'
        )

        document.documentElement.classList[this.darkMode ? 'add' : 'remove'](
          'dark-scrollbars-compat'
        )
      }
    },
  },
})

// export default useStyleStore
