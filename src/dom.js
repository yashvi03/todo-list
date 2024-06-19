import { ProjectManager } from './projectManager.js';
import { TaskManager } from './taskManager.js';

export class domHandler {
  constructor() {
    this.taskManager = new TaskManager();
    this.projectManager = new ProjectManager();
    this.init();
  }

  init() {
    document.getElementById('add-task-btn').addEventListener('click', () => this.openTaskDialog());
    document.getElementById('new-task-add-button').addEventListener('click', (e) => this.addTask(e));
    document.getElementById('new-task-cancel-button').addEventListener('click', () => this.closeTaskDialog());
    document.getElementById('add-project-icon').addEventListener('click', () => this.openProjectDialog());
    document.getElementById('new-project-add-button').addEventListener('click', (e) => this.addProject(e));
    document.getElementById('new-project-cancel-button').addEventListener('click', () => this.closeProjectDialog());

    // Initial rendering of tasks for the default project
    this.taskManager.renderTasks(this.projectManager.currentProject);

    // Add event listener for project list items
    const projectListItems = document.querySelectorAll('#project-list li');
    projectListItems.forEach((item) => {
      item.addEventListener('click', () => {
        const projectName = item.textContent.trim();
        this.projectManager.switchProject(projectName);
        this.highlightSelectedProject(item);
        this.taskManager.renderTasks(projectName);
      });
    });
  }

  highlightSelectedProject(selectedItem) {
    // Remove 'selected' class from all project list items
    const projectListItems = document.querySelectorAll('#project-list li');
    projectListItems.forEach((item) => {
      item.classList.remove('selected');
    });
  
    // Add 'selected' class to the clicked project list item
    selectedItem.classList.add('selected');
  }
  openTaskDialog() {
    const taskDialog = document.querySelector('.new-task-dialog');
    taskDialog.classList.remove('hidden');
    taskDialog.showModal();
  }

  closeTaskDialog() {
    const taskDialog = document.querySelector('.new-task-dialog');
    taskDialog.classList.add('hidden');
    taskDialog.close();
  }

  addTask(e) {
    e.preventDefault();
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const dueDate = document.getElementById('due-date-input').value;
    const priority = document.getElementById('priority-input').value;
    const currentProject = this.projectManager.currentProject;

    this.taskManager.addTask(currentProject, { title, description, dueDate, priority });
    this.closeTaskDialog();
  }

  openProjectDialog() {
    const projectDialog = document.querySelector('.new-project-dialog');
    projectDialog.classList.remove('hidden');
    projectDialog.showModal();
  }

  closeProjectDialog() {
    const projectDialog = document.querySelector('.new-project-dialog');
    projectDialog.classList.add('hidden');
    projectDialog.close();
  }

  addProject(e) {
    e.preventDefault();
    const title = document.getElementById('project-title-input').value;
    this.projectManager.addProject(title);
    this.closeProjectDialog();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const DomHandler = new domHandler();

  const projectManager = DomHandler.projectManager;
  projectManager.renderProjects();
});
