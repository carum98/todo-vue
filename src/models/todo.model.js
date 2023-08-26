export class Todo {
    constructor(data) {
        this.id = data['id']
        this.title = data['title']
        this.is_completed = data['is_completed']

        Object.freeze(this)
    }
}