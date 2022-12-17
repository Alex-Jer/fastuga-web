import { mdiAccount, mdiLogout } from '@mdi/js'

export default [
  {
    isCurrentUser: true,
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
        label: 'Terminar Sessão',
        isLogout: true,
      },
    ],
  },
]
