import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  createProject(form_data): void{
    this.projectService.addProject(form_data)
    .subscribe(
      project => console.log(project),
      error => console.log(<any>error)
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

}
