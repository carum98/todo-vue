<script setup>
import { useAuthStore } from '@stores/auth.store'
import { RouterNames } from '@router/names'
import { useFormValidation } from '@composables/useFormValidation'

const { login } = useAuthStore()
const { form, disabled } = useFormValidation()
</script>

<template>
    <h1>Login</h1>
    <form ref="form" @submit.prevent="login">
        <input autofocus type="text" name="user_name" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" :disabled="disabled" value="Login" >
    </form>
    <RouterLink :to="{ name: RouterNames.Register }">
        Register
    </RouterLink>
</template>