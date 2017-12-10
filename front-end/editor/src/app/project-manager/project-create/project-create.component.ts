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

  /* 
  This output is used to notify project list component that it needs
  to update beacuse a new project was added to the database */
  @Output() onProjectCreated = new EventEmitter<boolean>();

  // The default values for the project
  project: Project;
  // The default values for the cafile fields in the  settings section
  cafile : Cafile;
  // List of available templates
  template_names : string[];
  // List of available states type 
  states_types : string[];
  // List of available celular automata neighbors pattern
  neighborhood_names: string[];
  nbhds_patterns: {};

  // To display informative message regarding project creation process 
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

  createProject(): void{
    this.cattService.addProject(this.project,this.cafile)
    .subscribe(
      // Successful responses call the first callback.
      data => this.onSuccess(data),
      // Errors will call this callback instead.
      error => this.onError(error)
    );
  }

  onSuccess(data: Object) : void {
    console.log(data);
    // The service is available and performs its work successfully
    if(data['success']){
      this.message.success(data['success']);
      this.onProjectCreated.emit(true);
    // The server is availabe but it doesn't perform its work
    // successfully
    }else if(data['error']){
      this.message.error(data['error'])
    }else{
    // The server do not send its data on this format
    /*
    {
      'success':'', when the server is available and perform its work correctly.
      'error':'', otherwise
      'data':'',
    }
    */
    }
  }

  onError(error: any) : void {
    this.message.error('an error has ocurred on the server side or probably it is not running !!');
    //console.log("an error has ocurred on the server side or probably it is not running !!");
  }

}
