<script setup>
import { List } from '@models/list.model'
import { Todo } from '@models/todo.model'
import { $fetch } from '@utils/fetch'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
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

async function submit() {
    if (props.item instanceof List) {
        await $fetch.delete(`/lists/${props.item.id}`)
    } else if (props.item instanceof Todo) {
        await $fetch.delete(`/todos/${props.item.id}`)
    }

    props.onClose()
    props.onRefresh(props.item)
}

function cancel() {
    props.onClose()
}
</script>

<template>
    <div class="dialog-confirm">
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>

        <button @click="submit">Delete</button>
        <button @click="cancel">Cancel</button>
    </div>
</template>