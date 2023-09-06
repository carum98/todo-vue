<script setup>
import { ref } from 'vue'

const colors = [
    '#f43b30',
    '#e71f56',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#5677fc',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#259b24',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
    '#9e9e9e',
]

const props = defineProps({
    defaultValue: {
        type: String,
        default: '#f43b30'
    }
})

const value = ref(props.defaultValue)

function updateColor(color) {
    value.value = color
}
</script>

<template>
    <div class="color-picker">
        <input name="color" type="color" :defaultValue="value" style="display: none;" />
        <button
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            :class="{ active: color === value }"
            @click.prevent="updateColor(color)"
        ></button>
    </div>
</template>

<style scoped>
.color-picker {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;

    & button {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: none;
        cursor: pointer;

        &.active::before {
            content: '✔';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            color: #fff;
        }
    }
}
</style>
