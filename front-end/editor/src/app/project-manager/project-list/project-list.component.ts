import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects : Observable<Project[]>;
  selectedProject: Project;

  constructor(private projectService: ProjectService) { 

  }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }

  onSelect(project: Project): void{
    this.selectedProject = project;
  }

}
