import { createRouter, createWebHistory } from 'vue-router'
import RouteRedirector from '@/components/global/RouteRedirector.vue'
import { useUserStore } from '@/stores/user'
import Home from '@/views/HomeView.vue'
import Cart from '@/views/CartView.vue'
import Products from '@/views/ProductsView.vue'
import Users from '@/views/UsersView.vue'
import Statistics from '@/views/StatisticsView.vue'
import StatisticsChef from '@/views/StatisticsChefView.vue'
import StatisticsServer from '@/views/StatisticsServerView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Orders from '@/views/OrdersView.vue'
import Order from '@/views/OrderView.vue'
import CurrentDishes from '@/views/ChefView.vue'
import CurrentOrders from '@/views/ServerView.vue'
import Profile from '@/views/ProfileView.vue'
import Error from '@/views/ErrorView.vue'

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
      title: 'Login',
    },
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    meta: {
      title: 'Register',
    },
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    meta: {
      title: 'Cart',
    },
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    meta: {
      title: 'Orders',
    },
    path: '/orders',
    name: 'orders',
    component: Orders,
  },
  {
    meta: {
      title: 'Order',
    },
    path: '/orders/:id',
    name: 'order',
    component: Order,
    props: (route) => ({ order: parseInt(route.params.id, 10) }),
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
      title: 'Current Dishes',
    },
    path: '/current-dishes',
    name: 'current-dishes',
    component: CurrentDishes,
  },
  {
    meta: {
      title: 'Current Orders',
    },
    path: '/current-orders',
    name: 'current-orders',
    component: CurrentOrders,
  },
  {
    meta: {
      title: 'Profile',
    },
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    meta: {
      title: 'Error',
    },
    path: '/error',
    name: 'error',
    component: Error,
  },
  {
    meta: {
      title: 'Statistics',
    },
    path: '/statistics',
    name: 'statistics',
    component: Statistics,
  },
  {
    meta: {
      title: 'Statistics',
    },
    path: '/statistics-chef',
    name: 'statistics-chef',
    component: StatisticsChef,
  },
  {
    meta: {
      title: 'Statistics',
    },
    path: '/statistics-server',
    name: 'statistics-server',
    component: StatisticsServer,
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

  const noLoginRoutes = ['Redirect', 'login', 'register', 'home', 'dashboard', 'error']
  const noEmployeeRoutes = ['cart']
  const loginRoutes = ['profile', 'order']
  const customerRoutes = ['orders']
  const managerRoutes = ['products', 'users', 'orders', 'statistics']
  const chefRoutes = ['current-dishes', 'statistics-chef']
  const serverRoutes = ['current-orders', 'statistics-server']

  /* If the user is not logged in */
  if (noLoginRoutes.includes(to.name)) {
    next()
    return
  }

  const userStore = useUserStore()

  /* If the user is logged in */
  if (userStore.user) {
    if (loginRoutes.includes(to.name)) {
      next()
      return
    }
  }

  /* If the user is a customer */
  if (userStore.user?.type === 'C') {
    if (customerRoutes.includes(to.name)) {
      next()
      return
    }
  }

  /* If the user is not an employee */
  if (userStore.user?.type === 'C' || !userStore.user) {
    if (noEmployeeRoutes.includes(to.name)) {
      next()
      return
    }
  }

  /* If the user is a manager */
  if (userStore.user?.type === 'EM') {
    if (managerRoutes.includes(to.name)) {
      next()
      return
    }
  }

  /* If the user is a chef */
  if (userStore.user?.type === 'EC') {
    if (chefRoutes.includes(to.name)) {
      next()
      return
    }
  }

  if (userStore.user?.type === 'ED') {
    if (serverRoutes.includes(to.name)) {
      next()
      return
    }
  }

  /* If the user tried to access a route that requires login */
  if (!userStore.user) {
    next({ name: 'login' })
    return
  }

  /* If the user does not have the necessary permissions */
  next({ name: 'error' })
})

export default router
