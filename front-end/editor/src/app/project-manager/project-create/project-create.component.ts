import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ParallelTemplateService } from '../../services/parallel-templates.service';
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

  constructor(private parallelTemplateService: ParallelTemplateService) {
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
      'Success','alert alert-warning','','',true
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
    this.parallelTemplateService.addProject(this.project,this.cafile)
    .subscribe(
      // Successful responses call the first callback.
      response => {
        console.log(response);
      },
      // Errors will call this callback instead.
      error => {
        if(error.status == 0){
          this.message.error('The API server is not running !!');
        }else if(error.status == 404){
          this.message.error('The API URL is not correct !!');
        }else{
          this.message.error('Some error has ocurred !!');
          console.log('Some error has ocurred !!');
          console.log(error);
        }
      },
      // If there are not errors this function is called finally
      () => {
        this.message.success('The project was created successfully !!')
        /* We tell to project-list component it needs to be updated */
        this.onProjectCreated.emit(true);
      }
    );
  }
}
