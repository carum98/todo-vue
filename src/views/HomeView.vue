<script setup>
import TheList from '@components/TheList.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <section>
        <TheList />
    </section>
    <section>
        <RouterView :key="route.params.id" />
    </section>
</template>