import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiGithub,
  mdiLogout,
  mdiReact,
  mdiThemeLightDark,
} from '@mdi/js'
import { useUserStore } from './stores/user'

// const userStore = useUserStore()
// const { user } = userStore.user

if (useUserStore) {
  console.log('Pinia is working')
  console.log("User's name: ", useUserStore.user?.name)
} else {
  console.log('Pinia is not working')
}

export default [
  // userStore?.user.name && {
  {
    icon: mdiAccount,
    // label: userStore.user.name,
    menu: [
      {
        icon: mdiAccount,
        label: 'Perfil',
        to: '/profile',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Sair',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: 'Sair',
    isDesktopNoLabel: true,
    isLogout: true,
  },
]
