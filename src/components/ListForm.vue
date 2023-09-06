<script setup>
import { List } from '@models/list.model'
import { $fetch } from '@utils/fetch.js'
import { useFormValidation } from '@composables/useFormValidation'

import ColorPicker from '@components/ColorPicker.vue'

const props = defineProps({
    list: {
        type: List,
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

    if (props.list) {
        return $fetch.put(`/lists/${props.list.id}`, values)
    } else {
        return $fetch.post('/lists', values)
    }
}

async function submit(event) {
    const data = await request(event)
    const list = new List(data)

    props.onClose()
    props.onRefresh(list)
}
</script>

<template>
    <form ref="form" @submit.prevent="submit">
        <input name="name" type="text" :defaultValue="list?.name" placeholder="Add new todo" />
        <ColorPicker :defaultValue="list?.color"  />
        <input type="submit" :disabled="disabled" value="Add">
    </form>
</template>