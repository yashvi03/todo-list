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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ05tQztBQUNuQztBQUNBO0FBQ0EseUJBQXlCLDRDQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrTWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3RNYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgVGFza01hbmFnZXIgfSBmcm9tICcuL3Rhc2tNYW5hZ2VyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBkb21IYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudGFza01hbmFnZXIgPSBuZXcgVGFza01hbmFnZXIoKTtcclxuICAgIHRoaXMucHJvamVjdE1hbmFnZXIgPSBuZXcgUHJvamVjdE1hbmFnZXIoKTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub3BlblRhc2tEaWFsb2coKSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stYWRkLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuYWRkVGFzayhlKSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stY2FuY2VsLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZVRhc2tEaWFsb2coKSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtaWNvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vcGVuUHJvamVjdERpYWxvZygpKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctcHJvamVjdC1hZGQtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5hZGRQcm9qZWN0KGUpKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctcHJvamVjdC1jYW5jZWwtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlUHJvamVjdERpYWxvZygpKTtcclxuXHJcbiAgICAvLyBJbml0aWFsIHJlbmRlcmluZyBvZiB0YXNrcyBmb3IgdGhlIGRlZmF1bHQgcHJvamVjdFxyXG4gICAgdGhpcy50YXNrTWFuYWdlci5yZW5kZXJUYXNrcyh0aGlzLnByb2plY3RNYW5hZ2VyLmN1cnJlbnRQcm9qZWN0KTtcclxuXHJcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHByb2plY3QgbGlzdCBpdGVtc1xyXG4gICAgY29uc3QgcHJvamVjdExpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwcm9qZWN0LWxpc3QgbGknKTtcclxuICAgIHByb2plY3RMaXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gaXRlbS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0TWFuYWdlci5zd2l0Y2hQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodFNlbGVjdGVkUHJvamVjdChpdGVtKTtcclxuICAgICAgICB0aGlzLnRhc2tNYW5hZ2VyLnJlbmRlclRhc2tzKHByb2plY3ROYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhpZ2hsaWdodFNlbGVjdGVkUHJvamVjdChzZWxlY3RlZEl0ZW0pIHtcclxuICAgIC8vIFJlbW92ZSAnc2VsZWN0ZWQnIGNsYXNzIGZyb20gYWxsIHByb2plY3QgbGlzdCBpdGVtc1xyXG4gICAgY29uc3QgcHJvamVjdExpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwcm9qZWN0LWxpc3QgbGknKTtcclxuICAgIHByb2plY3RMaXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICB9KTtcclxuICBcclxuICAgIC8vIEFkZCAnc2VsZWN0ZWQnIGNsYXNzIHRvIHRoZSBjbGlja2VkIHByb2plY3QgbGlzdCBpdGVtXHJcbiAgICBzZWxlY3RlZEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICB9XHJcbiAgb3BlblRhc2tEaWFsb2coKSB7XHJcbiAgICBjb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrLWRpYWxvZycpO1xyXG4gICAgdGFza0RpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIHRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZVRhc2tEaWFsb2coKSB7XHJcbiAgICBjb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrLWRpYWxvZycpO1xyXG4gICAgdGFza0RpYWxvZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHRhc2tEaWFsb2cuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2soZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uLWlucHV0JykudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZS1kYXRlLWlucHV0JykudmFsdWU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1pbnB1dCcpLnZhbHVlO1xyXG4gICAgY29uc3QgY3VycmVudFByb2plY3QgPSB0aGlzLnByb2plY3RNYW5hZ2VyLmN1cnJlbnRQcm9qZWN0O1xyXG5cclxuICAgIHRoaXMudGFza01hbmFnZXIuYWRkVGFzayhjdXJyZW50UHJvamVjdCwgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5IH0pO1xyXG4gICAgdGhpcy5jbG9zZVRhc2tEaWFsb2coKTtcclxuICB9XHJcblxyXG4gIG9wZW5Qcm9qZWN0RGlhbG9nKCkge1xyXG4gICAgY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctcHJvamVjdC1kaWFsb2cnKTtcclxuICAgIHByb2plY3REaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICBwcm9qZWN0RGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VQcm9qZWN0RGlhbG9nKCkge1xyXG4gICAgY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctcHJvamVjdC1kaWFsb2cnKTtcclxuICAgIHByb2plY3REaWFsb2cuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUtaW5wdXQnKS52YWx1ZTtcclxuICAgIHRoaXMucHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdCh0aXRsZSk7XHJcbiAgICB0aGlzLmNsb3NlUHJvamVjdERpYWxvZygpO1xyXG4gIH1cclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBjb25zdCBEb21IYW5kbGVyID0gbmV3IGRvbUhhbmRsZXIoKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdE1hbmFnZXIgPSBEb21IYW5kbGVyLnByb2plY3RNYW5hZ2VyO1xyXG4gIHByb2plY3RNYW5hZ2VyLnJlbmRlclByb2plY3RzKCk7XHJcbn0pO1xyXG4iLCJleHBvcnQgY2xhc3MgUHJvamVjdE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucmV0cmlldmVQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UoKSB8fCBbJ0RlZmF1bHQnXTtcclxuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSB0aGlzLnJldHJpZXZlQ3VycmVudFByb2plY3RGcm9tTG9jYWxTdG9yYWdlKCkgfHwgJ0RlZmF1bHQnO1xyXG4gICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gIH1cclxuXHJcbiAgcmV0cmlldmVQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICBjb25zdCBzdG9yZWRQcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpO1xyXG4gICAgaWYgKHN0b3JlZFByb2plY3RzKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkUHJvamVjdHMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgcHJvamVjdHMgZnJvbSBsb2NhbCBzdG9yYWdlOicsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXRyaWV2ZUN1cnJlbnRQcm9qZWN0RnJvbUxvY2FsU3RvcmFnZSgpIHtcclxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKTtcclxuICB9XHJcblxyXG4gIHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9qZWN0cykpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JywgdGhpcy5jdXJyZW50UHJvamVjdCk7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIGNvbnN0IHByb2plY3RTdHJpbmcgPSBTdHJpbmcocHJvamVjdCkudHJpbSgpO1xyXG4gICAgaWYgKHByb2plY3RTdHJpbmcgIT09ICcnKSB7XHJcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0U3RyaW5nKTtcclxuICAgICAgdGhpcy5zYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IHRpdGxlIGNhbm5vdCBiZSBlbXB0eSBvciBvbmx5IHdoaXRlc3BhY2UuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzd2l0Y2hQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgdGhpcy5zYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcclxuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9qZWN0U3RyaW5nID0gU3RyaW5nKHByb2plY3QpLnRyaW0oKTtcclxuXHJcbiAgICAgIGlmIChwcm9qZWN0U3RyaW5nICE9PSAnJykge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3RTdHJpbmc7XHJcbiAgICAgICAgaWYgKHByb2plY3RTdHJpbmcgPT09IHRoaXMuY3VycmVudFByb2plY3QpIHtcclxuICAgICAgICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zd2l0Y2hQcm9qZWN0KHByb2plY3RTdHJpbmcpKTtcclxuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBwcm9qZWN0IHRpdGxlIGZvdW5kIGluIHByb2plY3RzIGFycmF5OicsIHByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFRhc2tNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLnRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgfHwge307XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzYXZlVGFza3NUb0xvY2FsU3RvcmFnZSgpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy50YXNrcykpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgYWRkVGFzayhwcm9qZWN0LCB0YXNrKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RLZXkgPSBTdHJpbmcocHJvamVjdCkudHJpbSgpO1xyXG4gICAgICBpZiAoIXRoaXMudGFza3NbcHJvamVjdEtleV0pIHtcclxuICAgICAgICB0aGlzLnRhc2tzW3Byb2plY3RLZXldID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy50YXNrc1twcm9qZWN0S2V5XS5wdXNoKHsgLi4udGFzaywgY29tcGxldGVkOiBmYWxzZSB9KTsgLy8gRW5zdXJlICdjb21wbGV0ZWQnIHByb3BlcnR5IGlzIGFkZGVkXHJcbiAgICAgIHRoaXMuc2F2ZVRhc2tzVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgICAgdGhpcy5yZW5kZXJUYXNrcyhwcm9qZWN0S2V5KTtcclxuICAgIH1cclxuICBcclxuICAgIHJlbW92ZVRhc2socHJvamVjdCwgaW5kZXgpIHtcclxuICAgICAgY29uc3QgcHJvamVjdEtleSA9IFN0cmluZyhwcm9qZWN0KS50cmltKCk7XHJcbiAgICAgIGlmICh0aGlzLnRhc2tzW3Byb2plY3RLZXldICYmIHRoaXMudGFza3NbcHJvamVjdEtleV0ubGVuZ3RoID4gaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnRhc2tzW3Byb2plY3RLZXldLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5zYXZlVGFza3NUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MocHJvamVjdEtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3QsIGluZGV4KSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RLZXkgPSBTdHJpbmcocHJvamVjdCkudHJpbSgpO1xyXG4gICAgICBpZiAodGhpcy50YXNrc1twcm9qZWN0S2V5XSAmJiB0aGlzLnRhc2tzW3Byb2plY3RLZXldW2luZGV4XSkge1xyXG4gICAgICAgIHRoaXMudGFza3NbcHJvamVjdEtleV1baW5kZXhdLmNvbXBsZXRlZCA9ICF0aGlzLnRhc2tzW3Byb2plY3RLZXldW2luZGV4XS5jb21wbGV0ZWQ7XHJcbiAgICAgICAgdGhpcy5zYXZlVGFza3NUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MocHJvamVjdEtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHJlbmRlclRhc2tzKHByb2plY3QpIHtcclxuICAgICAgICBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1saXN0XCIpO1xyXG4gICAgICAgIHRhc2tMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIFxyXG4gICAgICAgIGNvbnN0IHRhc2tzID0gdGhpcy50YXNrc1twcm9qZWN0XSB8fCBbXTtcclxuICAgICAgXHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWl0ZW1cIik7XHJcbiAgICAgIFxyXG4gICAgICAgICAgLy8gQWRkIHByaW9yaXR5IGNsYXNzIGJhc2VkIG9uIHRhc2sgcHJpb3JpdHlcclxuICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09PSBcIkhpZ2hcIikge1xyXG4gICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktaGlnaFwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5wcmlvcml0eSA9PT0gXCJNZWRpdW1cIikge1xyXG4gICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktbWVkaXVtXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0YXNrLnByaW9yaXR5ID09PSBcIkxvd1wiKSB7XHJcbiAgICAgICAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1sb3dcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgICAgLy8gQWRkIGNvbXBsZXRlZCBjbGFzcyBpZiB0YXNrIGlzIGNvbXBsZXRlZFxyXG4gICAgICAgICAgaWYgKHRhc2suY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgICAgdGFza0l0ZW0uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwidGFzay1jaGVja2JveFwiIGlkPVwidGFzay0ke2luZGV4fVwiICR7dGFzay5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJ30+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stJHtpbmRleH1cIj48L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj4ke3Rhc2sudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtYnRuXCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke3Rhc2suZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkdWUtZGF0ZVwiPkR1ZSBEYXRlOiAke3Rhc2suZHVlRGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmlvcml0eVwiPlByaW9yaXR5OiAke3Rhc2sucHJpb3JpdHl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGA7XHJcbiAgICAgIFxyXG4gICAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xyXG4gICAgICBcclxuICAgICAgICAgIC8vIEF0dGFjaCBldmVudCBsaXN0ZW5lcnMgZm9yIGRlbGV0ZSBidXR0b24gYW5kIGNoZWNrYm94XHJcbiAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0YXNrSXRlbS5xdWVyeVNlbGVjdG9yKFwiLmRlbGV0ZS1idG5cIik7XHJcbiAgICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYXNrKHByb2plY3QsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcyhwcm9qZWN0KTsgLy8gUmUtcmVuZGVyIHRhc2tzIGFmdGVyIGRlbGV0aW9uXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgICAgICBjb25zdCBjaGVja2JveCA9IHRhc2tJdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jaGVja2JveFwiKTtcclxuICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3QsIGluZGV4KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxuICAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRvbUhhbmRsZXIgfSBmcm9tICcuL2RvbSc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGNvbnN0IERvbUhhbmRsZXIgPSBuZXcgZG9tSGFuZGxlcigpO1xyXG5cclxuICBjb25zdCBwcm9qZWN0TWFuYWdlciA9IERvbUhhbmRsZXIucHJvamVjdE1hbmFnZXI7XHJcbiAgcHJvamVjdE1hbmFnZXIucmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcclxuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgcHJvamVjdE1hbmFnZXIucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIHByb2plY3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdDtcclxuICAgICAgcHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgcHJvamVjdE1hbmFnZXIuc3dpdGNoUHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICBEb21IYW5kbGVyLnRhc2tNYW5hZ2VyLnJlbmRlclRhc2tzKHByb2plY3QpO1xyXG4gICAgICB9KTtcclxuICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHJvamVjdE1hbmFnZXIucmVuZGVyUHJvamVjdHMoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==