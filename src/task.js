export default class Task {
    constructor(title, description, dueDate, priority) {
        this.id = `task_${Date.now()}`;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
