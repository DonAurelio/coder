import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { File } from '../models/file';
import { FileService } from '../services/file.service';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, OnDestroy {

  project_id: any;
  params: any;

  project: Project;
  files: Observable<File[]>;
  selectedFile: File;
  preview_text: string;


  constructor(private activatedRoute: ActivatedRoute, 
    private fileService: FileService, private projectService: ProjectService ) {
      this.project = new Project(0,'no name','no description','no type');
      this.selectedFile = new File(0,'somefile','somefiletype','example text');
      this.preview_text = "some preview text";
  }

  ngOnInit() {
    /* Getting the project id from the url */
    this.params = this.activatedRoute.params.subscribe(
      params => this.project_id = params['id']
    );
    this.loadProject();
    this.loadFiles();
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  loadProject(): void {
    this.projectService.getProjectById(this.project_id).subscribe(
      response => this.project = response,
      error => console.log("The project can not be loaded !!"),
      () => console.log("The project was loadded successfully !!")
    );
  }

  loadFiles(): void {
    this.files = this.fileService.getFilesFromProject(this.project_id);
  }

  setSelectedFile(file: File): void {
    this.selectedFile = file;
  }

  /* Save changes from the current selected file in the api */
  saveChanges(): void {
    this.fileService.updateFile(this.selectedFile).subscribe(
      success => console.log("The file was saved successfully !!"),
      error => console.log("Some error has ocurred !!"),
    );
  }

}
