export function onDragStart(event) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-todo-id'))
}

export function onDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
}

export function onDrop(event, callback) {
    event.preventDefault()

    const target = event.target

    if (!(target instanceof HTMLLIElement)) {
        return
    }

    const id = event.dataTransfer.getData('text/plain')
    const todo = document.querySelector(`[data-todo-id="${id}"]`)

    if (!(todo instanceof HTMLLIElement)) {
        return
    }

    // Get the list parent
    const list = todo.parentElement

    const index = [...list.children].indexOf(todo)
        const newIndex = [...list.children].indexOf(target)

    todo?.remove()

    if (index > newIndex) {
        target?.insertAdjacentElement('beforebegin', todo)
    } else {
        target?.insertAdjacentElement('afterend', todo)
    }

    event.dataTransfer.clearData()

    callback(id, newIndex)
}
