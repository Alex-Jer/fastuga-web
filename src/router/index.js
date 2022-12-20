import { createRouter, createWebHistory } from 'vue-router'
import RouteRedirector from '@/components/global/RouteRedirector.vue'
import { useUserStore } from '@/stores/user'
import Home from '@/views/HomeView.vue'
import Products from '@/views/ProductsView.vue'
import Users from '@/views/UsersView.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Home',
    },
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/redirect/:redirectTo',
    name: 'Redirect',
    component: RouteRedirector,
    props: (route) => ({ redirectTo: route.params.redirectTo }),
  },
  {
    meta: {
      title: 'Products',
    },
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    meta: {
      title: 'Users',
    },
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    meta: {
      title: 'Dashboard',
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },

  {
    meta: {
      title: 'Tables',
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue'),
  },
  {
    meta: {
      title: 'Forms',
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue'),
  },
  {
    meta: {
      title: 'Profile',
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    meta: {
      title: 'Ui',
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue'),
  },
  {
    meta: {
      title: 'Responsive layout',
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue'),
  },
  {
    meta: {
      title: 'Login',
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    meta: {
      title: 'Error',
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

let handlingFirstRoute = true

router.beforeEach((to, from, next) => {
  if (handlingFirstRoute) {
    handlingFirstRoute = false
    next({ name: 'Redirect', params: { redirectTo: to.fullPath } })
    return
  }

  if (to.name === 'Redirect') {
    next()
    return
  }

  if (to.name === 'login' || to.name === 'home') {
    next()
    return
  }

  if (to.name === 'dashboard') {
    next()
    return
  }

  const userStore = useUserStore()

  if (userStore.user?.type === 'EM') {
    if (to.name === 'products' || to.name === 'users') {
      next()
      return
    }
  }

  if (!userStore.user) {
    next({ name: 'login' })
    // return
  }
})

export default router
