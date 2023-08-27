<script setup>
import { Todo } from '@models/todo.model'
import { $fetch } from '@utils/fetch.js'
import { useFormValidation } from '@composables/useFormValidation'

const props = defineProps({
    listId: {
        type: Number,
        required: true
    },
    todo: {
        type: Todo,
    },
    onClose: {
        type: Function,
        required: true
    },
    onRefresh: {
        type: Function,
        required: true
    }
})

const { form, disabled } = useFormValidation()

function request(event) {
    const values = Object.fromEntries(new FormData(event.target).entries())

    if (props.todo) {
        return $fetch.put(`/todos/${props.todo.id}`, values)
    } else {
        return $fetch.post(`/lists/${props.listId}/todos`, values)
    }
}

async function submit(event) {
    const data = await request(event)
    const list = new Todo(data)

    props.onClose()
    props.onRefresh(list)
}
</script>

<template>
    <form ref="form" @submit.prevent="submit">
        <input type="text" name="title" :defaultValue="todo?.title || ''" placeholder="Title" />
        <input type="submit" :disabled="disabled" value="Add">
    </form>
</template>