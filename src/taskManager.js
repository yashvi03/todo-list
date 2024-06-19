export class TaskManager {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    }
  
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    addTask(project, task) {
      const projectKey = String(project).trim();
      if (!this.tasks[projectKey]) {
        this.tasks[projectKey] = [];
      }
      this.tasks[projectKey].push({ ...task, completed: false }); // Ensure 'completed' property is added
      this.saveTasksToLocalStorage();
      this.renderTasks(projectKey);
    }
  
    removeTask(project, index) {
      const projectKey = String(project).trim();
      if (this.tasks[projectKey] && this.tasks[projectKey].length > index) {
        this.tasks[projectKey].splice(index, 1);
        this.saveTasksToLocalStorage();
        this.renderTasks(projectKey);
      }
    }
  
    toggleTaskCompletion(project, index) {
      const projectKey = String(project).trim();
      if (this.tasks[projectKey] && this.tasks[projectKey][index]) {
        this.tasks[projectKey][index].completed = !this.tasks[projectKey][index].completed;
        this.saveTasksToLocalStorage();
        this.renderTasks(projectKey);
      }
    }
  
    renderTasks(project) {
        const taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
      
        const tasks = this.tasks[project] || [];
      
        tasks.forEach((task, index) => {
          const taskItem = document.createElement("div");
          taskItem.classList.add("task-item");
      
          // Add priority class based on task priority
          if (task.priority === "High") {
            taskItem.classList.add("priority-high");
          } else if (task.priority === "Medium") {
            taskItem.classList.add("priority-medium");
          } else if (task.priority === "Low") {
            taskItem.classList.add("priority-low");
          }
      
          // Add completed class if task is completed
          if (task.completed) {
            taskItem.classList.add("completed");
          }
      
          taskItem.innerHTML = `
            <div class="header">
              <input type="checkbox" class="task-checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
              <label for="task-${index}"></label>
              <span class="title">${task.title}</span>
              <button class="delete-btn">Delete</button>
            </div>
            <div class="description">${task.description}</div>
            <div class="details">
              <span class="due-date">Due Date: ${task.dueDate}</span>
              <span class="priority">Priority: ${task.priority}</span>
            </div>
          `;
      
          taskList.appendChild(taskItem);
      
          // Attach event listeners for delete button and checkbox
          const deleteButton = taskItem.querySelector(".delete-btn");
          deleteButton.addEventListener("click", () => {
            this.removeTask(project, index);
            this.renderTasks(project); // Re-render tasks after deletion
          });
      
          const checkbox = taskItem.querySelector(".task-checkbox");
          checkbox.addEventListener("change", () => {
            this.toggleTaskCompletion(project, index);
          });
        });
      }
      
  }
  