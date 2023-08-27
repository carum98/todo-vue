<script setup>
import { useAuthStore } from '@stores/auth.store'

const { login } = useAuthStore()
</script>

<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <input autofocus type="text" name="user_name" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" >
    </form>
</template>