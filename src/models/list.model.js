export class List {
    constructor(data) {
        this.id = data['id']
        this.name = data['name']
        this.color = data['color']

        Object.freeze(this)
    }
}