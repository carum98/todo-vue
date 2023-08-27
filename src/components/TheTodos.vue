<script setup>
import { ref, onMounted } from 'vue'
import { $fetch } from '@utils/fetch'
import { useRoute } from 'vue-router'
import { Todo } from '@models/todo.model'
import { useDialog } from '@composables/useDialog'
import { onDragStart, onDragOver, onDrop } from '@utils/draggable'

import IconRadioUnChecked from '@icons/IconRadioUnChecked.vue'
import IconRadioChecked from '@icons/IconRadioChecked.vue'
import IconDrag from '@icons/IconDrag.vue'

const route = useRoute()

const listId = route.params.id

const { open } = useDialog(
    () => import('@components/TodoForm.vue'),
    {
        listId,
        onRefresh: (todo) => {
            const index = items.value.findIndex(i => i.id === todo.id)

            if (index === -1) {
                items.value.push(todo)
            } else {
                items.value.splice(index, 1, todo)
            }
        }
    }
)

const { open: openDelete } = useDialog(
    () => import('@components/DeleteConfirmation.vue'),
    {
        title: 'Delete todo',
        message: 'Are you sure you want to delete this todo?',
        onRefresh: (todo) => {
            items.value = items.value.filter(i => i.id !== todo.id)
        }
    }
)

// data
const items = ref([])

// methods
async function getData() {
    const { data } = await $fetch.get(`/lists/${listId}/todos`)

    items.value = data.map(item => new Todo(item))
}

async function toggle(item) {
    const data = await $fetch.post(`/todos/${item.id}/toggle`)

    const index = items.value.findIndex(i => i.id === data.id)
    const todo = new Todo(data)

    items.value.splice(index, 1, todo)
}

async function move(id, index) {
    const data = await $fetch.post(`/todos/${id}/move`, { 
        position: index + 1
    })

    console.log(data)
}

// lifecycle
onMounted(() => getData())
</script>

<template>
    <button @click="open">Add</button>
    <ul>
        <li 
            v-for="item in items" 
            :key="item.id" 
            draggable="true"
            :data-todo-id="item.id"
            @dragstart="onDragStart"
            @dragover="onDragOver"
            @drop="onDrop($event, move)"
        >
            <IconDrag />

            <button @click="toggle(item)">
                <IconRadioChecked v-if="item.is_complete" />
                <IconRadioUnChecked v-else />
                {{ item.title }}
            </button>

            <button @click="open({ todo: item })">Edit</button>
            <button @click="openDelete({ item })">Delete</button>
        </li>
    </ul>
</template>