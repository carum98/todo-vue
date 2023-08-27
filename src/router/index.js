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
      meta: {
        layout: 'main-layout'
      },
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
      meta: {
        layout: 'auth-layout'
      },
      component: () => import('@views/LoginView.vue')
    }
  ]
})

// Guard Auth
router.beforeEach((to, from) => {
    const store = useAuthStore()
    const isAuthenticated = store.isAuthenticated

    if (to.meta.layout) {
      const app = document.querySelector('#app')

      app?.classList.remove('auth-layout', 'main-layout')
      app?.classList.add(to.meta.layout)
    }

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
