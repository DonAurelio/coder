import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;

  constructor() { 
    this.projects = [
      new Project('Project 1','No description'),
      new Project('Project 2','No description')
    ];
  }

  ngOnInit() {
  }

  onSelect(project: Project){
    this.selectedProject = project;
  }

}
