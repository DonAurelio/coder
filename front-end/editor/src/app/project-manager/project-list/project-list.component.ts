import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  /**
   * List of available projects
   */
  // if you use observables add 'async' to the ngFor directive
  // projects : Observable<Project[]>; 
  projects: Project[];
  /**
   * The selected project
   */
  selectedProject: Project;

  constructor(private projectService: ProjectService, private router: Router) { 

  }

  ngOnInit() {
    this.loadProjects();
  }

  /**
   * Load the project list from the project service
   */
  loadProjects(){
    // observables approach
    // this.projects = this.projectService.getProjects();
    this.projectService.getProjects().subscribe(
      response => {console.log(response); this.projects = response;},
      error => console.log('The projects list can not be loaded',error),
      () => console.log('successfull message')
    );
  }

  /**
   * Change the current selected project
   * @param project the new seleted project
   */
  onSelect(project: Project) : void{
    this.selectedProject = project;
  }

  /**
   * Is called by the project create componet to 
   * refresh the project list when a new project
   * was created.
   * @param value an event value
   */
  onLoadProjects(value: boolean) : void {
    this.loadProjects();
  }

  /**
   * Redirect to the code-editor component
   * to edit the selected project
   * @param event an event value 
   */
  openProject(event:any): void {
    this.router.navigate([`/project/edit/${this.selectedProject.id}`]);
  }

  /**
   * Delete the selected project
   * @param event 
   */
  deleteProject(event:any): void {
    var response: Object;
    this.projectService.deleteProject(this.selectedProject).subscribe(
      response => response = response,
      error => console.log("The project can not be deleted, probably it was already deleted. !!"),
      
      /* If the delection was successfull, refresh the projects list */
      () => { 
        console.log("The project was deleted successfully !!"); 
        this.loadProjects();
        this.selectedProject = null;
      }
    );

  }
}
