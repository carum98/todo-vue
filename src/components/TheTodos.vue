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
import IconRemove from '@icons/IconRemove.vue'
import IconEdit from '@icons/IconEdit.vue'
import IconAdd from '@icons/IconAdd.vue'

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
    },
    false
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
    <header class="header-table">
        <h2>ToDos</h2>
        <button @click="open">
            <IconAdd />
        </button>
    </header>
    <ul class="todos">
        <li 
            v-for="item in items" 
            :key="item.id" 
            draggable="true"
            class="todo-item"
            :data-todo-id="item.id"
            :data-complete="item.is_complete"
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

            <div class="actions">
                <button @click.stop.prevent="open({ todo: item })">
                    <IconEdit />
                </button>
                <button @click.stop.prevent="openDelete({ item })">
                    <IconRemove />
                </button>
            </div>
        </li>
    </ul>
</template>