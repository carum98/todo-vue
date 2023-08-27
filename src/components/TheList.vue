<script setup>
import { $fetch } from '@utils/fetch'
import { onMounted, ref } from 'vue'
import { List } from '@models/list.model'
import { RouterNames } from '@router/names'
import { useDialog } from '@composables/useDialog'

import IconCircle from '@icons/IconCircle.vue'
import IconRemove from '@icons/IconRemove.vue'
import IconEdit from '@icons/IconEdit.vue'
import IconAdd from '@icons/IconAdd.vue'

const { open } = useDialog(
    () => import('@components/ListForm.vue'),
    {
        onRefresh: (list) => {
            const index = items.value.findIndex(i => i.id === list.id)

            if (index === -1) {
                items.value.push(list)
            } else {
                items.value.splice(index, 1, list)
            }
        }
    }
)

const { open: openDelete } = useDialog(
    () => import('@components/DeleteConfirmation.vue'),
    {
        title: 'Delete list',
        message: 'Are you sure you want to delete this list?',
        onRefresh: (list) => {
            items.value = items.value.filter(i => i.id !== list.id)
        }
    }
)

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
    <header class="header-table">
        <h2>Lists</h2>
        <button @click="open">
            <IconAdd />
        </button>
    </header>
    
    <ul class="lists">
        <li class="list-item" v-for="item in items" :key="item.id">
            <RouterLink :to="{ name: RouterNames.List, params: { id: item.id } }">
                <IconCircle :style="{ color: item.color }" />
                {{ item.name }}

                <div class="actions">
                    <button @click.stop.prevent="open({ list: item })">
                        <IconEdit />
                    </button>
                    <button @click.stop.prevent="openDelete({ item })">
                        <IconRemove />
                    </button>
                </div>
            </RouterLink>
        </li>
    </ul>
</template>