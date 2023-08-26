<script setup>
import { ref, onMounted } from 'vue'
import { $fetch } from '@utils/fetch'
import { useRoute } from 'vue-router'
import { Todo } from '@models/todo.model'

const route = useRoute()

// data
const items = ref([])

// methods
async function getData() {
    const { data } = await $fetch.get(`/lists/${route.params.id}/todos`)

    items.value = data.map(item => new Todo(item))
}

// lifecycle
onMounted(() => getData())
</script>

<template>
    <ul>
        <li v-for="item in items" :key="item.id">
            <button>
                {{ item.title }}
            </button>
        </li>
    </ul>
</template>