import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  /* This output is used to notify project list component that it needs
  to update beacuse a new project was added to the database */
  @Output() onProjectCreated = new EventEmitter<boolean>(); 

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
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
