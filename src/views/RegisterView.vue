<script setup>
import { useAuthStore } from '@stores/auth.store'
import { RouterNames } from '@router/names'
import { useFormValidation } from '@composables/useFormValidation'

const { register } = useAuthStore()
const { form, disabled } = useFormValidation()
</script>

<template>
    <h1>Register</h1>
    <form ref="form" @submit.prevent="register">
        <input autofocus type="text" name="name" placeholder="Name" />
        <input type="text" name="user_name" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" :disabled="disabled" value="Register" >
    </form>
    <RouterLink :to="{ name: RouterNames.Login }">
        Login
    </RouterLink>
</template>