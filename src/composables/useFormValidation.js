import { onMounted, onUnmounted, ref } from 'vue'

export function useFormValidation() {
    // data
    const form = ref(null)
    const disabled = ref(true)

    // methods
    function validate() {
        const values = Object.fromEntries(new FormData(form.value).entries())

        disabled.value = Object.values(values).some(value => !value)
    }

    // lifecycle
    onMounted(() => form.value?.addEventListener('input', validate))
    onUnmounted(() => form.value?.removeEventListener('input', validate))

    return {
        form,
        disabled
    }
}