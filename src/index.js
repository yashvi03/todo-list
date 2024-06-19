import { domHandler } from './dom';

document.addEventListener('DOMContentLoaded', () => {
  const DomHandler = new domHandler();

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
