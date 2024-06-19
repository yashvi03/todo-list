/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
    constructor(name, description) {
      this.name = name;
      this.description = description;
      this.task = [];
    }
  
    addTask(task) {
      this.task.push(task);
    }
  
    deleteTask(index) {
      this.task.splice(index, 1);
    }
  }

/***/ }),

/***/ "./src/projectManager.js":
/*!*******************************!*\
  !*** ./src/projectManager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");


const projectManager = (() => {
  let projects = [];
  let currentProjectIndex = 0;

  const addProject = (name, description) => {
    const project = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](name, description);
    projects.push(project);
    saveToLocalStorage();
  };

  const getProjects = () => projects;

  const getCurrentProject = () => projects[currentProjectIndex];

  const setCurrentProject = (index) => {
    currentProjectIndex = index;
  };

  const addTaskToCurrentProject = (task) => {
    projects[currentProjectIndex].addTask(task);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const loadFromLocalStorage = () => {
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    if (savedProjects) {
      projects = savedProjects.map(proj => Object.assign(new _project__WEBPACK_IMPORTED_MODULE_0__["default"](proj.name, proj.description), proj));
    } else {
      projects = [new _project__WEBPACK_IMPORTED_MODULE_0__["default"]('Default Project')];
    }
  };

  loadFromLocalStorage();

  return { addProject, getProjects, getCurrentProject, setCurrentProject, addTaskToCurrentProject, saveToLocalStorage };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectManager);


/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    update(details) {
        Object.assign(this, details);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);


/***/ }),

/***/ "./src/taskManager.js":
/*!****************************!*\
  !*** ./src/taskManager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _projectManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectManager.js */ "./src/projectManager.js");



const taskManager = () => {
    const addTask = (project, title, description, dueDate, priority) => {
        const todo = new _task_js__WEBPACK_IMPORTED_MODULE_0__["default"](title, description, dueDate, priority);
        project.addTask(todo);
        _projectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveToLocalStorage();
    };

    const removeTask = (project, task) => {
        project.removeTask(task);
        _projectManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveToLocalStorage();
    };

    return { addTask, removeTask };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskManager);


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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _projectManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectManager */ "./src/projectManager.js");
/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskManager */ "./src/taskManager.js");





let dialog = document.getElementById("task-dialog");

let addProject = document.getElementById("add-project");
addProject.addEventListener('click', () => {
  openProjectForm();
});

function openProjectForm() {
    console.log("Opening Form");
  let projectForm = document.createElement("div");
  projectForm.style.border = "1px solid black";

  let close = document.createElement("span");
  close.textContent = "close";
  close.classList.add("material-symbols-outlined");
  close.addEventListener("click", () => {
    projectForm.remove();
  });

  let title = document.createElement("input");
  title.type = "text";
  title.placeholder = "Project Title";

  let description = document.createElement("input");
  description.type = "text";
  description.placeholder = "Project Description";

  let add = document.createElement("button");
  add.textContent = "Add Project";
  add.addEventListener("click", () => {
    let newProject = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](title.value, description.value);
    addNewProject(newProject);
    projectForm.remove();
  });

  projectForm.appendChild(close);
  projectForm.appendChild(title);
  projectForm.appendChild(description);
  projectForm.appendChild(add);

  dialog.appendChild(projectForm);
}

function addNewProject(project) {
  let projectList = document.getElementById("project-list");
  let projectItem = document.createElement("li");
  projectItem.textContent = project.title;
  _projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(project);
  projectItem.classList.add("project-item");
  projectItem.addEventListener("click", () => {
    let index = Array.from(projectItem.parentNode.children).indexOf(
      projectItem
    );
    _projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].setCurrentProject(index);
    loadProjectPage(_projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].getCurrentProject());
  });
  projectList.appendChild(projectItem);
}

function loadProjectPage(project) {
  let heading = document.getElementById("heading");
  heading.textContent = `${project.name}`;

  renderTasks(project.task); 
}

function renderTasks(tasks) {
  let tasksContainer = document.getElementById("tasks-container");
  tasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    let taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.toggleComplete();
      _projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].saveToLocalStorage();
    });

    let taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;

    let taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;

    let taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Due: ${task.dueDate}`;

    let taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${task.priority}`;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      _taskManager__WEBPACK_IMPORTED_MODULE_3__["default"].removeTask(_projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].getCurrentProject(), task);
      loadProjectPage(_projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].getCurrentProject());
    });

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(taskPriority);
    taskItem.appendChild(deleteButton);

    tasksContainer.appendChild(taskItem);
  });
}

let addTask = document.getElementById("add-task");
addTask.addEventListener("click", () => {
  openTaskForm();
});

function openTaskForm() {
  let taskForm = document.createElement("div");
  taskForm.style.border = "1px solid black";

  let close = document.createElement("span");
  close.textContent = "close";
  close.classList.add("material-symbols-outlined");
  close.addEventListener("click", () => {
    taskForm.remove();
  });

  let title = document.createElement("input");
  title.type = "text";
  title.placeholder = "Title";

  let description = document.createElement("input");
  description.type = "text";
  description.placeholder = "Description";

  let date = document.createElement("input");
  date.type = "date";

  let priority = document.createElement("label");
  priority.textContent = "Priority";
  let priorityType = document.createElement("select");
  priorityType.id = "priority";
  let opt1 = document.createElement("option");
  opt1.value = "High";
  opt1.textContent = "High";
  let opt2 = document.createElement("option");
  opt2.value = "Medium";
  opt2.textContent = "Medium";
  let opt3 = document.createElement("option");
  opt3.value = "Low";
  opt3.textContent = "Low";
  priorityType.appendChild(opt1);
  priorityType.appendChild(opt2);
  priorityType.appendChild(opt3);

  let add = document.createElement("button");
  add.textContent = "Add Task";
  add.addEventListener("click", () => {
    let newTask = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](
      title.value,
      description.value,
      date.value,
      priorityType.value
    );
    addNewTask(newTask);
    taskForm.remove();
  });

  taskForm.appendChild(close);
  taskForm.appendChild(title);
  taskForm.appendChild(description);
  taskForm.appendChild(date);
  taskForm.appendChild(priority);
  taskForm.appendChild(priorityType);
  taskForm.appendChild(add);

  dialog.appendChild(taskForm);
}

function addNewTask(task) {
  _taskManager__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
    _projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].getCurrentProject(),
    task.title,
    task.description,
    task.dueDate,
    task.priority
  );
  loadProjectPage(_projectManager__WEBPACK_IMPORTED_MODULE_2__["default"].getCurrentProject());
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZDQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxvREFBVztBQUNiLElBQUksdURBQWM7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1REFBYztBQUNoQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICB0aGlzLnRhc2sgPSBbXTtcclxuICAgIH1cclxuICBcclxuICAgIGFkZFRhc2sodGFzaykge1xyXG4gICAgICB0aGlzLnRhc2sucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICBcclxuICAgIGRlbGV0ZVRhc2soaW5kZXgpIHtcclxuICAgICAgdGhpcy50YXNrLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfSIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XHJcblxyXG5jb25zdCBwcm9qZWN0TWFuYWdlciA9ICgoKSA9PiB7XHJcbiAgbGV0IHByb2plY3RzID0gW107XHJcbiAgbGV0IGN1cnJlbnRQcm9qZWN0SW5kZXggPSAwO1xyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSwgZGVzY3JpcHRpb24pO1xyXG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XHJcblxyXG4gIGNvbnN0IGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdHNbY3VycmVudFByb2plY3RJbmRleF07XHJcblxyXG4gIGNvbnN0IHNldEN1cnJlbnRQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICBjdXJyZW50UHJvamVjdEluZGV4ID0gaW5kZXg7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWRkVGFza1RvQ3VycmVudFByb2plY3QgPSAodGFzaykgPT4ge1xyXG4gICAgcHJvamVjdHNbY3VycmVudFByb2plY3RJbmRleF0uYWRkVGFzayh0YXNrKTtcclxuICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNhdmVUb0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9hZEZyb21Mb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzYXZlZFByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XHJcbiAgICBpZiAoc2F2ZWRQcm9qZWN0cykge1xyXG4gICAgICBwcm9qZWN0cyA9IHNhdmVkUHJvamVjdHMubWFwKHByb2ogPT4gT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdChwcm9qLm5hbWUsIHByb2ouZGVzY3JpcHRpb24pLCBwcm9qKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcm9qZWN0cyA9IFtuZXcgUHJvamVjdCgnRGVmYXVsdCBQcm9qZWN0JyldO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGxvYWRGcm9tTG9jYWxTdG9yYWdlKCk7XHJcblxyXG4gIHJldHVybiB7IGFkZFByb2plY3QsIGdldFByb2plY3RzLCBnZXRDdXJyZW50UHJvamVjdCwgc2V0Q3VycmVudFByb2plY3QsIGFkZFRhc2tUb0N1cnJlbnRQcm9qZWN0LCBzYXZlVG9Mb2NhbFN0b3JhZ2UgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2plY3RNYW5hZ2VyO1xyXG4iLCJjbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRldGFpbHMpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRldGFpbHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrO1xyXG4iLCJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrLmpzXCI7XHJcbmltcG9ydCBwcm9qZWN0TWFuYWdlciBmcm9tIFwiLi9wcm9qZWN0TWFuYWdlci5qc1wiO1xyXG5cclxuY29uc3QgdGFza01hbmFnZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrID0gKHByb2plY3QsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XHJcbiAgICAgICAgcHJvamVjdC5hZGRUYXNrKHRvZG8pO1xyXG4gICAgICAgIHByb2plY3RNYW5hZ2VyLnNhdmVUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVUYXNrID0gKHByb2plY3QsIHRhc2spID0+IHtcclxuICAgICAgICBwcm9qZWN0LnJlbW92ZVRhc2sodGFzayk7XHJcbiAgICAgICAgcHJvamVjdE1hbmFnZXIuc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7IGFkZFRhc2ssIHJlbW92ZVRhc2sgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tNYW5hZ2VyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xyXG5pbXBvcnQgcHJvamVjdE1hbmFnZXIgZnJvbSBcIi4vcHJvamVjdE1hbmFnZXJcIjtcclxuaW1wb3J0IHRhc2tNYW5hZ2VyIGZyb20gXCIuL3Rhc2tNYW5hZ2VyXCI7XHJcblxyXG5sZXQgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRpYWxvZ1wiKTtcclxuXHJcbmxldCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKTtcclxuYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBvcGVuUHJvamVjdEZvcm07XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gb3BlblByb2plY3RGb3JtKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJPcGVuaW5nIEZvcm1cIik7XHJcbiAgbGV0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwcm9qZWN0Rm9ybS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xyXG5cclxuICBsZXQgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBjbG9zZS50ZXh0Q29udGVudCA9IFwiY2xvc2VcIjtcclxuICBjbG9zZS5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiKTtcclxuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgcHJvamVjdEZvcm0ucmVtb3ZlKCk7XHJcbiAgfSk7XHJcblxyXG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICB0aXRsZS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgdGl0bGUucGxhY2Vob2xkZXIgPSBcIlByb2plY3QgVGl0bGVcIjtcclxuXHJcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGRlc2NyaXB0aW9uLnR5cGUgPSBcInRleHRcIjtcclxuICBkZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9IFwiUHJvamVjdCBEZXNjcmlwdGlvblwiO1xyXG5cclxuICBsZXQgYWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBhZGQudGV4dENvbnRlbnQgPSBcIkFkZCBQcm9qZWN0XCI7XHJcbiAgYWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBsZXQgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSk7XHJcbiAgICBhZGROZXdQcm9qZWN0KG5ld1Byb2plY3QpO1xyXG4gICAgcHJvamVjdEZvcm0ucmVtb3ZlKCk7XHJcbiAgfSk7XHJcblxyXG4gIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGNsb3NlKTtcclxuICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgcHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGFkZCk7XHJcblxyXG4gIGRpYWxvZy5hcHBlbmRDaGlsZChwcm9qZWN0Rm9ybSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld1Byb2plY3QocHJvamVjdCkge1xyXG4gIGxldCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1saXN0XCIpO1xyXG4gIGxldCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgcHJvamVjdE1hbmFnZXIuYWRkUHJvamVjdChwcm9qZWN0KTtcclxuICBwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pdGVtXCIpO1xyXG4gIHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBsZXQgaW5kZXggPSBBcnJheS5mcm9tKHByb2plY3RJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YoXHJcbiAgICAgIHByb2plY3RJdGVtXHJcbiAgICApO1xyXG4gICAgcHJvamVjdE1hbmFnZXIuc2V0Q3VycmVudFByb2plY3QoaW5kZXgpO1xyXG4gICAgbG9hZFByb2plY3RQYWdlKHByb2plY3RNYW5hZ2VyLmdldEN1cnJlbnRQcm9qZWN0KCkpO1xyXG4gIH0pO1xyXG4gIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFByb2plY3RQYWdlKHByb2plY3QpIHtcclxuICBsZXQgaGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGluZ1wiKTtcclxuICBoZWFkaW5nLnRleHRDb250ZW50ID0gYCR7cHJvamVjdC5uYW1lfWA7XHJcblxyXG4gIHJlbmRlclRhc2tzKHByb2plY3QudGFzayk7IFxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJUYXNrcyh0YXNrcykge1xyXG4gIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xyXG4gIHRhc2tzQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIGxldCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKFwidGFzay1pdGVtXCIpO1xyXG5cclxuICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZWQ7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgdGFzay50b2dnbGVDb21wbGV0ZSgpO1xyXG4gICAgICBwcm9qZWN0TWFuYWdlci5zYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XHJcbiAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG5cclxuICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XHJcblxyXG4gICAgbGV0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IGBEdWU6ICR7dGFzay5kdWVEYXRlfWA7XHJcblxyXG4gICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gYFByaW9yaXR5OiAke3Rhc2sucHJpb3JpdHl9YDtcclxuXHJcbiAgICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XHJcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgdGFza01hbmFnZXIucmVtb3ZlVGFzayhwcm9qZWN0TWFuYWdlci5nZXRDdXJyZW50UHJvamVjdCgpLCB0YXNrKTtcclxuICAgICAgbG9hZFByb2plY3RQYWdlKHByb2plY3RNYW5hZ2VyLmdldEN1cnJlbnRQcm9qZWN0KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcclxuICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XHJcbiAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcclxuXHJcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmxldCBhZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFza1wiKTtcclxuYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIG9wZW5UYXNrRm9ybTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBvcGVuVGFza0Zvcm0oKSB7XHJcbiAgbGV0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB0YXNrRm9ybS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xyXG5cclxuICBsZXQgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBjbG9zZS50ZXh0Q29udGVudCA9IFwiY2xvc2VcIjtcclxuICBjbG9zZS5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiKTtcclxuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdGFza0Zvcm0ucmVtb3ZlKCk7XHJcbiAgfSk7XHJcblxyXG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICB0aXRsZS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgdGl0bGUucGxhY2Vob2xkZXIgPSBcIlRpdGxlXCI7XHJcblxyXG4gIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICBkZXNjcmlwdGlvbi50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgZGVzY3JpcHRpb24ucGxhY2Vob2xkZXIgPSBcIkRlc2NyaXB0aW9uXCI7XHJcblxyXG4gIGxldCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGRhdGUudHlwZSA9IFwiZGF0ZVwiO1xyXG5cclxuICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBcIlByaW9yaXR5XCI7XHJcbiAgbGV0IHByaW9yaXR5VHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgcHJpb3JpdHlUeXBlLmlkID0gXCJwcmlvcml0eVwiO1xyXG4gIGxldCBvcHQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICBvcHQxLnZhbHVlID0gXCJIaWdoXCI7XHJcbiAgb3B0MS50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xyXG4gIGxldCBvcHQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICBvcHQyLnZhbHVlID0gXCJNZWRpdW1cIjtcclxuICBvcHQyLnRleHRDb250ZW50ID0gXCJNZWRpdW1cIjtcclxuICBsZXQgb3B0MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgb3B0My52YWx1ZSA9IFwiTG93XCI7XHJcbiAgb3B0My50ZXh0Q29udGVudCA9IFwiTG93XCI7XHJcbiAgcHJpb3JpdHlUeXBlLmFwcGVuZENoaWxkKG9wdDEpO1xyXG4gIHByaW9yaXR5VHlwZS5hcHBlbmRDaGlsZChvcHQyKTtcclxuICBwcmlvcml0eVR5cGUuYXBwZW5kQ2hpbGQob3B0Myk7XHJcblxyXG4gIGxldCBhZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGFkZC50ZXh0Q29udGVudCA9IFwiQWRkIFRhc2tcIjtcclxuICBhZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGxldCBuZXdUYXNrID0gbmV3IFRhc2soXHJcbiAgICAgIHRpdGxlLnZhbHVlLFxyXG4gICAgICBkZXNjcmlwdGlvbi52YWx1ZSxcclxuICAgICAgZGF0ZS52YWx1ZSxcclxuICAgICAgcHJpb3JpdHlUeXBlLnZhbHVlXHJcbiAgICApO1xyXG4gICAgYWRkTmV3VGFzayhuZXdUYXNrKTtcclxuICAgIHRhc2tGb3JtLnJlbW92ZSgpO1xyXG4gIH0pO1xyXG5cclxuICB0YXNrRm9ybS5hcHBlbmRDaGlsZChjbG9zZSk7XHJcbiAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gIHRhc2tGb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICB0YXNrRm9ybS5hcHBlbmRDaGlsZChkYXRlKTtcclxuICB0YXNrRm9ybS5hcHBlbmRDaGlsZChwcmlvcml0eSk7XHJcbiAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQocHJpb3JpdHlUeXBlKTtcclxuICB0YXNrRm9ybS5hcHBlbmRDaGlsZChhZGQpO1xyXG5cclxuICBkaWFsb2cuYXBwZW5kQ2hpbGQodGFza0Zvcm0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGROZXdUYXNrKHRhc2spIHtcclxuICB0YXNrTWFuYWdlci5hZGRUYXNrKFxyXG4gICAgcHJvamVjdE1hbmFnZXIuZ2V0Q3VycmVudFByb2plY3QoKSxcclxuICAgIHRhc2sudGl0bGUsXHJcbiAgICB0YXNrLmRlc2NyaXB0aW9uLFxyXG4gICAgdGFzay5kdWVEYXRlLFxyXG4gICAgdGFzay5wcmlvcml0eVxyXG4gICk7XHJcbiAgbG9hZFByb2plY3RQYWdlKHByb2plY3RNYW5hZ2VyLmdldEN1cnJlbnRQcm9qZWN0KCkpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
