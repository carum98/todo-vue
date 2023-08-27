import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { $fetch } from '@utils/fetch.js'
import { RouterNames } from '@router/names'

const KEY_STORE = 'token'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    // data
    const token = ref(localStorage.getItem(KEY_STORE) || null)
    const isAuthenticated = computed(() => !!token.value)

    // methods
    async function login(event) {
        try {
            const values = Object.fromEntries(new FormData(event.target).entries())
    
            const data = await $fetch.post('/login', values)
    
            token.value = data.token

            router.replace({ name: RouterNames.Home })
        } catch (error) {
            console.log(error)
        }
    }

    async function register(event) {
        try {
            const values = Object.fromEntries(new FormData(event.target).entries())

            const data = await $fetch.post('/register', values)

            token.value = data.token

            router.replace({ name: RouterNames.Home })
        } catch (error) {
            console.log(error)
        }
    }

    function logout() {
        token.value = null
        router.replace({ name: RouterNames.Login })
    }

    // hooks
    watch(token, (value) => {
        if (!value) {
            localStorage.removeItem(KEY_STORE)
        } else {
            localStorage.setItem(KEY_STORE, value)
        }
     })

    return { 
        token, 
        isAuthenticated, 
        login, 
        register,
        logout
     }
})