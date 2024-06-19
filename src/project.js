export default class Project {
  constructor(name) {
      this.name = name;
      this.tasks = [];
  }

  addTask(task) {
      this.tasks.push(task);
  }

  removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}