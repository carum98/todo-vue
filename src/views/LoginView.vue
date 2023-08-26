<script setup>
import { useAuthStore } from '@stores/auth.store'

const { login } = useAuthStore()
</script>

<template>
    <form @submit.prevent="login">
        <input type="text" name="user_name" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
</template>