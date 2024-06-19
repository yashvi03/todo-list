export class ProjectManager {
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
