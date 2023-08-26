<script setup>
import { ref, onMounted } from 'vue'
import { $fetch } from '@utils/fetch'
import { useRoute } from 'vue-router'
import { Todo } from '@models/todo.model'
import IconRadioUnChecked from '@icons/IconRadioUnChecked.vue'
import IconRadioChecked from '@icons/IconRadioChecked.vue'

const route = useRoute()

// data
const items = ref([])

// methods
async function getData() {
    const { data } = await $fetch.get(`/lists/${route.params.id}/todos`)

    items.value = data.map(item => new Todo(item))
}

async function toggle(item) {
    const data = await $fetch.post(`/todos/${item.id}/toggle`)

    const index = items.value.findIndex(i => i.id === data.id)
    const todo = new Todo(data)

    items.value.splice(index, 1, todo)
}

// lifecycle
onMounted(() => getData())
</script>

<template>
    <button>Add</button>
    <ul>
        <li v-for="item in items" :key="item.id">
            <button @click="toggle(item)">
                <IconRadioChecked v-if="item.is_complete" />
                <IconRadioUnChecked v-else />
                {{ item.title }}
            </button>
        </li>
    </ul>
</template>