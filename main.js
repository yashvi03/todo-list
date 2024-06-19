/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domHandler: () => (/* binding */ domHandler)
/* harmony export */ });
/* harmony import */ var _projectManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectManager.js */ "./src/projectManager.js");
/* harmony import */ var _taskManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskManager.js */ "./src/taskManager.js");



class domHandler {
  constructor() {
    this.taskManager = new _taskManager_js__WEBPACK_IMPORTED_MODULE_1__.TaskManager();
    this.projectManager = new _projectManager_js__WEBPACK_IMPORTED_MODULE_0__.ProjectManager();
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


/***/ }),

/***/ "./src/projectManager.js":
/*!*******************************!*\
  !*** ./src/projectManager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectManager: () => (/* binding */ ProjectManager)
/* harmony export */ });
class ProjectManager {
  constructor() {
    this.projects = this.retrieveProjectsFromLocalStorage() || ['Default'];
    this.currentProject = this.retrieveCurrentProjectFromLocalStorage() || 'Default';
    this.renderProjects();
  }

  retrieveProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      try {
        return JSON.parse(storedProjects);
      } catch (error) {
        console.error('Error parsing projects from local storage:', error);
      }
    }
    return null;
  }

  retrieveCurrentProjectFromLocalStorage() {
    return localStorage.getItem('currentProject');
  }

  saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
    localStorage.setItem('currentProject', this.currentProject);
  }

  addProject(project) {
    const projectString = String(project).trim();
    if (projectString !== '') {
      this.projects.push(projectString);
      this.saveProjectsToLocalStorage();
      this.renderProjects();
    } else {
      console.error('Project title cannot be empty or only whitespace.');
    }
  }

  switchProject(project) {
    this.currentProject = project;
    this.saveProjectsToLocalStorage();
    this.renderProjects();
  }

  renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    this.projects.forEach((project) => {
      const projectString = String(project).trim();

      if (projectString !== '') {
        const projectItem = document.createElement('li');
        projectItem.textContent = projectString;
        if (projectString === this.currentProject) {
          projectItem.classList.add('selected');
        }
        projectItem.addEventListener('click', () => this.switchProject(projectString));
        projectList.appendChild(projectItem);
      } else {
        console.error('Invalid project title found in projects array:', project);
      }
    });
  }
}


/***/ }),

/***/ "./src/taskManager.js":
/*!****************************!*\
  !*** ./src/taskManager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskManager: () => (/* binding */ TaskManager)
/* harmony export */ });
class TaskManager {
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
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


document.addEventListener('DOMContentLoaded', () => {
  const DomHandler = new _dom__WEBPACK_IMPORTED_MODULE_0__.domHandler();

  const projectManager = DomHandler.projectManager;
  projectManager.renderProjects = () => {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projectManager.projects.forEach((project) => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project;
      projectItem.addEventListener('click', () => {
        projectManager.switchProject(project);
        DomHandler.taskManager.renderTasks(project);
      });
      projectList.appendChild(projectItem);
    });
  };

  projectManager.renderProjects();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3RNYW5hZ2VyLmpzJztcbmltcG9ydCB7IFRhc2tNYW5hZ2VyIH0gZnJvbSAnLi90YXNrTWFuYWdlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBkb21IYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50YXNrTWFuYWdlciA9IG5ldyBUYXNrTWFuYWdlcigpO1xuICAgIHRoaXMucHJvamVjdE1hbmFnZXIgPSBuZXcgUHJvamVjdE1hbmFnZXIoKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vcGVuVGFza0RpYWxvZygpKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stYWRkLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuYWRkVGFzayhlKSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLWNhbmNlbC1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2VUYXNrRGlhbG9nKCkpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1pY29uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLm9wZW5Qcm9qZWN0RGlhbG9nKCkpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctcHJvamVjdC1hZGQtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5hZGRQcm9qZWN0KGUpKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXByb2plY3QtY2FuY2VsLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZVByb2plY3REaWFsb2coKSk7XG5cbiAgICAvLyBJbml0aWFsIHJlbmRlcmluZyBvZiB0YXNrcyBmb3IgdGhlIGRlZmF1bHQgcHJvamVjdFxuICAgIHRoaXMudGFza01hbmFnZXIucmVuZGVyVGFza3ModGhpcy5wcm9qZWN0TWFuYWdlci5jdXJyZW50UHJvamVjdCk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHByb2plY3QgbGlzdCBpdGVtc1xuICAgIGNvbnN0IHByb2plY3RMaXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcHJvamVjdC1saXN0IGxpJyk7XG4gICAgcHJvamVjdExpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGl0ZW0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICB0aGlzLnByb2plY3RNYW5hZ2VyLnN3aXRjaFByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFNlbGVjdGVkUHJvamVjdChpdGVtKTtcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlci5yZW5kZXJUYXNrcyhwcm9qZWN0TmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhpZ2hsaWdodFNlbGVjdGVkUHJvamVjdChzZWxlY3RlZEl0ZW0pIHtcbiAgICAvLyBSZW1vdmUgJ3NlbGVjdGVkJyBjbGFzcyBmcm9tIGFsbCBwcm9qZWN0IGxpc3QgaXRlbXNcbiAgICBjb25zdCBwcm9qZWN0TGlzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Byb2plY3QtbGlzdCBsaScpO1xuICAgIHByb2plY3RMaXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH0pO1xuICBcbiAgICAvLyBBZGQgJ3NlbGVjdGVkJyBjbGFzcyB0byB0aGUgY2xpY2tlZCBwcm9qZWN0IGxpc3QgaXRlbVxuICAgIHNlbGVjdGVkSXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICB9XG4gIG9wZW5UYXNrRGlhbG9nKCkge1xuICAgIGNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2stZGlhbG9nJyk7XG4gICAgdGFza0RpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xuICB9XG5cbiAgY2xvc2VUYXNrRGlhbG9nKCkge1xuICAgIGNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2stZGlhbG9nJyk7XG4gICAgdGFza0RpYWxvZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB0YXNrRGlhbG9nLmNsb3NlKCk7XG4gIH1cblxuICBhZGRUYXNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQnKS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbi1pbnB1dCcpLnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlLWRhdGUtaW5wdXQnKS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1pbnB1dCcpLnZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gdGhpcy5wcm9qZWN0TWFuYWdlci5jdXJyZW50UHJvamVjdDtcblxuICAgIHRoaXMudGFza01hbmFnZXIuYWRkVGFzayhjdXJyZW50UHJvamVjdCwgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5IH0pO1xuICAgIHRoaXMuY2xvc2VUYXNrRGlhbG9nKCk7XG4gIH1cblxuICBvcGVuUHJvamVjdERpYWxvZygpIHtcbiAgICBjb25zdCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1wcm9qZWN0LWRpYWxvZycpO1xuICAgIHByb2plY3REaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgcHJvamVjdERpYWxvZy5zaG93TW9kYWwoKTtcbiAgfVxuXG4gIGNsb3NlUHJvamVjdERpYWxvZygpIHtcbiAgICBjb25zdCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1wcm9qZWN0LWRpYWxvZycpO1xuICAgIHByb2plY3REaWFsb2cuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgcHJvamVjdERpYWxvZy5jbG9zZSgpO1xuICB9XG5cbiAgYWRkUHJvamVjdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUtaW5wdXQnKS52YWx1ZTtcbiAgICB0aGlzLnByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QodGl0bGUpO1xuICAgIHRoaXMuY2xvc2VQcm9qZWN0RGlhbG9nKCk7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgRG9tSGFuZGxlciA9IG5ldyBkb21IYW5kbGVyKCk7XG5cbiAgY29uc3QgcHJvamVjdE1hbmFnZXIgPSBEb21IYW5kbGVyLnByb2plY3RNYW5hZ2VyO1xuICBwcm9qZWN0TWFuYWdlci5yZW5kZXJQcm9qZWN0cygpO1xufSk7XG4iLCJleHBvcnQgY2xhc3MgUHJvamVjdE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gdGhpcy5yZXRyaWV2ZVByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSgpIHx8IFsnRGVmYXVsdCddO1xuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSB0aGlzLnJldHJpZXZlQ3VycmVudFByb2plY3RGcm9tTG9jYWxTdG9yYWdlKCkgfHwgJ0RlZmF1bHQnO1xuICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcbiAgfVxuXG4gIHJldHJpZXZlUHJvamVjdHNGcm9tTG9jYWxTdG9yYWdlKCkge1xuICAgIGNvbnN0IHN0b3JlZFByb2plY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJyk7XG4gICAgaWYgKHN0b3JlZFByb2plY3RzKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdG9yZWRQcm9qZWN0cyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHByb2plY3RzIGZyb20gbG9jYWwgc3RvcmFnZTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0cmlldmVDdXJyZW50UHJvamVjdEZyb21Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpO1xuICB9XG5cbiAgc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9qZWN0cykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvamVjdCcsIHRoaXMuY3VycmVudFByb2plY3QpO1xuICB9XG5cbiAgYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdFN0cmluZyA9IFN0cmluZyhwcm9qZWN0KS50cmltKCk7XG4gICAgaWYgKHByb2plY3RTdHJpbmcgIT09ICcnKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdFN0cmluZyk7XG4gICAgICB0aGlzLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3QgdGl0bGUgY2Fubm90IGJlIGVtcHR5IG9yIG9ubHkgd2hpdGVzcGFjZS4nKTtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2hQcm9qZWN0KHByb2plY3QpIHtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0aGlzLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xuICB9XG5cbiAgcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB0aGlzLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RTdHJpbmcgPSBTdHJpbmcocHJvamVjdCkudHJpbSgpO1xuXG4gICAgICBpZiAocHJvamVjdFN0cmluZyAhPT0gJycpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3RTdHJpbmc7XG4gICAgICAgIGlmIChwcm9qZWN0U3RyaW5nID09PSB0aGlzLmN1cnJlbnRQcm9qZWN0KSB7XG4gICAgICAgICAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc3dpdGNoUHJvamVjdChwcm9qZWN0U3RyaW5nKSk7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgcHJvamVjdCB0aXRsZSBmb3VuZCBpbiBwcm9qZWN0cyBhcnJheTonLCBwcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMudGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB8fCB7fTtcbiAgICB9XG4gIFxuICAgIHNhdmVUYXNrc1RvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy50YXNrcykpO1xuICAgIH1cbiAgXG4gICAgYWRkVGFzayhwcm9qZWN0LCB0YXNrKSB7XG4gICAgICBjb25zdCBwcm9qZWN0S2V5ID0gU3RyaW5nKHByb2plY3QpLnRyaW0oKTtcbiAgICAgIGlmICghdGhpcy50YXNrc1twcm9qZWN0S2V5XSkge1xuICAgICAgICB0aGlzLnRhc2tzW3Byb2plY3RLZXldID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLnRhc2tzW3Byb2plY3RLZXldLnB1c2goeyAuLi50YXNrLCBjb21wbGV0ZWQ6IGZhbHNlIH0pOyAvLyBFbnN1cmUgJ2NvbXBsZXRlZCcgcHJvcGVydHkgaXMgYWRkZWRcbiAgICAgIHRoaXMuc2F2ZVRhc2tzVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgIHRoaXMucmVuZGVyVGFza3MocHJvamVjdEtleSk7XG4gICAgfVxuICBcbiAgICByZW1vdmVUYXNrKHByb2plY3QsIGluZGV4KSB7XG4gICAgICBjb25zdCBwcm9qZWN0S2V5ID0gU3RyaW5nKHByb2plY3QpLnRyaW0oKTtcbiAgICAgIGlmICh0aGlzLnRhc2tzW3Byb2plY3RLZXldICYmIHRoaXMudGFza3NbcHJvamVjdEtleV0ubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgICAgdGhpcy50YXNrc1twcm9qZWN0S2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnNhdmVUYXNrc1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MocHJvamVjdEtleSk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2dnbGVUYXNrQ29tcGxldGlvbihwcm9qZWN0LCBpbmRleCkge1xuICAgICAgY29uc3QgcHJvamVjdEtleSA9IFN0cmluZyhwcm9qZWN0KS50cmltKCk7XG4gICAgICBpZiAodGhpcy50YXNrc1twcm9qZWN0S2V5XSAmJiB0aGlzLnRhc2tzW3Byb2plY3RLZXldW2luZGV4XSkge1xuICAgICAgICB0aGlzLnRhc2tzW3Byb2plY3RLZXldW2luZGV4XS5jb21wbGV0ZWQgPSAhdGhpcy50YXNrc1twcm9qZWN0S2V5XVtpbmRleF0uY29tcGxldGVkO1xuICAgICAgICB0aGlzLnNhdmVUYXNrc1RvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MocHJvamVjdEtleSk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICByZW5kZXJUYXNrcyhwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIik7XG4gICAgICAgIHRhc2tMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBcbiAgICAgICAgY29uc3QgdGFza3MgPSB0aGlzLnRhc2tzW3Byb2plY3RdIHx8IFtdO1xuICAgICAgXG4gICAgICAgIHRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWl0ZW1cIik7XG4gICAgICBcbiAgICAgICAgICAvLyBBZGQgcHJpb3JpdHkgY2xhc3MgYmFzZWQgb24gdGFzayBwcmlvcml0eVxuICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09PSBcIkhpZ2hcIikge1xuICAgICAgICAgICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LWhpZ2hcIik7XG4gICAgICAgICAgfSBlbHNlIGlmICh0YXNrLnByaW9yaXR5ID09PSBcIk1lZGl1bVwiKSB7XG4gICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktbWVkaXVtXCIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5wcmlvcml0eSA9PT0gXCJMb3dcIikge1xuICAgICAgICAgICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LWxvd1wiKTtcbiAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAvLyBBZGQgY29tcGxldGVkIGNsYXNzIGlmIHRhc2sgaXMgY29tcGxldGVkXG4gICAgICAgICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgIHRhc2tJdGVtLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwidGFzay1jaGVja2JveFwiIGlkPVwidGFzay0ke2luZGV4fVwiICR7dGFzay5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJ30+XG4gICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLSR7aW5kZXh9XCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPiR7dGFzay50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtYnRuXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7dGFzay5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHVlLWRhdGVcIj5EdWUgRGF0ZTogJHt0YXNrLmR1ZURhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW9yaXR5XCI+UHJpb3JpdHk6ICR7dGFzay5wcmlvcml0eX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBgO1xuICAgICAgXG4gICAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xuICAgICAgXG4gICAgICAgICAgLy8gQXR0YWNoIGV2ZW50IGxpc3RlbmVycyBmb3IgZGVsZXRlIGJ1dHRvbiBhbmQgY2hlY2tib3hcbiAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0YXNrSXRlbS5xdWVyeVNlbGVjdG9yKFwiLmRlbGV0ZS1idG5cIik7XG4gICAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhc2socHJvamVjdCwgaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcyhwcm9qZWN0KTsgLy8gUmUtcmVuZGVyIHRhc2tzIGFmdGVyIGRlbGV0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgICBjb25zdCBjaGVja2JveCA9IHRhc2tJdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jaGVja2JveFwiKTtcbiAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlVGFza0NvbXBsZXRpb24ocHJvamVjdCwgaW5kZXgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICB9XG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZG9tSGFuZGxlciB9IGZyb20gJy4vZG9tJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgRG9tSGFuZGxlciA9IG5ldyBkb21IYW5kbGVyKCk7XG5cbiAgY29uc3QgcHJvamVjdE1hbmFnZXIgPSBEb21IYW5kbGVyLnByb2plY3RNYW5hZ2VyO1xuICBwcm9qZWN0TWFuYWdlci5yZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICBwcm9qZWN0TWFuYWdlci5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3Q7XG4gICAgICBwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHJvamVjdE1hbmFnZXIuc3dpdGNoUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgRG9tSGFuZGxlci50YXNrTWFuYWdlci5yZW5kZXJUYXNrcyhwcm9qZWN0KTtcbiAgICAgIH0pO1xuICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHByb2plY3RNYW5hZ2VyLnJlbmRlclByb2plY3RzKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==