import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CattService } from '../../services/catt.service';
import { Cafile } from '../../models/cafile';
import { Project } from '../../models/project';
import { Message } from '../../models/message';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  /**
   * This output is used to notify project list component that it needs
   * to update beacuse a new project was added to the database.
   */
  @Output() onProjectCreated = new EventEmitter<boolean>();

  /**
   * The default values for the project form.
   */
  project: Project;
  /**
   * The default values for the cafile fields in the settings section
   */ 
  cafile : Cafile;
  /**
   * List of available templates.
   */
  template_names : string[];
  /**
   * List of available states type.
   */ 
  states_types : string[];
  /**
   * List of available celular automata neighborhood pattern.
   */
  neighborhood_names: string[];
  nbhds_patterns: {};

  /**
   * To display informative message regarding project creation process 
   */
  message : Message;

  constructor(private cattService: CattService) {
    this.project = new Project('','','','stencil');
    this.template_names = ['stencil'];
  
    this.cafile = new Cafile(20,20,'int',100,'neumann');
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
 
    this.message = new Message(
      'Success','alert alert-warning','',true
    );

  }

  ngOnInit() {
  }

  getCurrentNeighborPattern(){
    return this.nbhds_patterns[this.cafile.nbhd_name];
  }

  /**
   * Creates a cellular automata project 
   * on the API database.
   */
  createProject(): void{
    this.cattService.addProject(this.project,this.cafile)
    .subscribe(
      // Successful responses call the first callback.
      response => {
        console.log(response);
        this.message.success(response['message']);
      },
      // Errors will call this callback instead.
      error => {
        console.log(error);
        this.message.error(error['message'])
      },
      // If the project creation was sucessfull
      () => console.log('The project creation was completed')
    );
  }
}
