import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Cafile } from '../../models/cafile';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  /* 
  This output is used to notify project list component that it needs
  to update beacuse a new project was added to the database */
  @Output() onProjectCreated = new EventEmitter<boolean>();

  // The default values for the cafile fields 
  cafile : Cafile;
  // List of available pattern names
  patterns_name : string[];
  // List of available states type 
  states_types : string[];
  // List of available celular automata neighbors pattern
  neighborhood_names: string[];
  nbhds_patterns: {};

  constructor(private projectService: ProjectService) {
    this.cafile = new Cafile(20,20,'int',100,'neumann');
    this.patterns_name = ['stencil','other'];
    this.states_types = ['int','bool','float'];
    this.neighborhood_names = ['neumann','moore'];

    this.nbhds_patterns = {
      'neumann': [
        [" "," "," "," "," "],
        [" "," ","1"," "," "],
        [" ","1","1","1"," "],
        [" "," ","1"," "," "],
        [" "," "," "," "," "],
      ],
      'moore': [
        [" "," "," "," "," "],
        [" ","1","1","1"," "],
        [" ","1","1","1"," "],
        [" ","1","1","1"," "],
        [" "," "," "," "," "],
      ]
    };
  }

  ngOnInit() {
  }

  getCurrentNeighborPattern(){
    return this.nbhds_patterns[this.cafile.neighborhood_name];
  }

  createProject(form_data): void{
    this.projectService.addProject(form_data)
    .subscribe(
      project => this.onSuccess(project),
      error => this.onError(error)
    );
  }

  onSuccess(project: Object) : void {
    console.log('A project was saved into the data base !!');
    console.log(project);
    this.onProjectCreated.emit(true);
  }

  onError(error: any) : void {
    console.log("An error has ocurred !!");
    console.log(error);
  }

}
