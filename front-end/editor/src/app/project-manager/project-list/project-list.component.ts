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

  projects : Observable<Project[]>;
  selectedProject: Project;

  constructor(private projectService: ProjectService, private router: Router) { 

  }

  ngOnInit() {
    this.loadProjects();
  }

  /* Load the project list from the project service */
  loadProjects(){
    this.projects = this.projectService.getProjects();
  }

  /* Change the current selected project */
  onSelect(project: Project) : void{
    this.selectedProject = project;
  }

  /* Is called by the project create componet to refresh the project list
  when a new project was created */
  onLoadProjects(value: boolean) : void {
    this.loadProjects();
  }

  openProject(event:any): void {
    this.router.navigate([`/project/edit/${this.selectedProject.id}`]);
  }

}
