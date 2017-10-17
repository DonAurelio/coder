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

    /* Replace the line above for the following line in case of errors in the server side.
    .subscribe(
      data => {console.log("Data !!")},
      (err: any) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
    */
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
