import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TemplateService } from '../services/templates.service';
import { ToastrService } from 'ngx-toastr';
import { Context } from '../models/context';
import { Project } from '../models/project';
import { Message } from '../models/message';

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
   * The default values for the fields in the settings section
   */ 
  context : Context;
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

  constructor(private toastrService: ToastrService,private templateService: TemplateService) {
    this.project = new Project(undefined,undefined,'','stencil');
    this.template_names = ['stencil'];
  
    this.context = new Context(20,20,'int',100,'neumann');
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
    return this.nbhds_patterns[this.context.nbhd_name];
  }

  /**
   * Creates a cellular automata project 
   * on the API database.
   */
  createProject(): void{
    this.templateService.addProject(this.project,this.context)
    .subscribe(
      response_body => {
        
      },
      error_body => {
        this.toastrService.error(error_body.message || error_body.error);
        // console.log('createProject Error',error_body.message);
      },
      () => {
        this.toastrService.success('The project was created successfully !!');
        /* We tell to project-list component it needs to be updated */
        this.onProjectCreated.emit(true);
      }
    );
  }
}
