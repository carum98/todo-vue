<script setup>
import { $fetch } from '@utils/fetch'
import { onMounted, ref } from 'vue'
import { List } from '@models/list.model'
import { RouterNames } from '@router/names'

// data
const items = ref([])

// methods
async function getData() {
    const { data } = await $fetch.get('/lists')

    items.value = data.map(item => new List(item))
}

// lifecycle
onMounted(() => getData())
</script>

<template>
    <ul>
        <li v-for="item in items" :key="item.id">
            <RouterLink :to="{ name: RouterNames.List, params: { id: item.id } }">
                {{ item.name }}
            </RouterLink>
        </li>
    </ul>
</template>