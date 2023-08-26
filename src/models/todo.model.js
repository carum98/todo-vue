export class Todo {
    constructor(data) {
        this.id = data['id']
        this.title = data['title']
        this.is_complete = data['is_complete']

        Object.freeze(this)
    }
}