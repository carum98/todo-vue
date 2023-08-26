import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@stores/auth.store'
import { RouterNames } from '@router/names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouterNames.Home,
      component: () => import('@views/HomeView.vue'),
      children: [
        {
          path: ':id',
          name: RouterNames.List,
          component: () => import('@components/TheTodos.vue')
        }
      ]
    },
    {
      path: '/login',
      name: RouterNames.Login,
      component: () => import('@views/LoginView.vue')
    }
  ]
})

// Guard Auth
router.beforeEach((to, from) => {
    const store = useAuthStore()
    const isAuthenticated = store.isAuthenticated

    if (!isAuthenticated && to.name !== RouterNames.Login) {
      return { 
        name: RouterNames.Login
      }
    } else if (isAuthenticated && to.name === RouterNames.Login) {
      return { 
        name: RouterNames.Home
      }
    }
})

export default router
