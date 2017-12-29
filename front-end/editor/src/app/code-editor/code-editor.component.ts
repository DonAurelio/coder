import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { File } from '../models/file';
import { FileService } from '../services/file.service';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { PragccService } from '../services/pragcc.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, OnDestroy {

  /* To get the project id from the current url */
  params: any;

  /* To keep the project id */
  project_id: any;

  /* The current project data */
  project: Project;

  /* The file belonging to the project */
  files: Observable<File[]>;

  /* The selected file */
  selectedFile: File;

  /* Code editor right hand editor text */
  previewFile: File;

  /**
   * The editor highlighting mode 
   */
  editor_mode: string;

  /* Console text area text */
  textarea_log_text: string;

  constructor(private activatedRoute: ActivatedRoute,private fileService: FileService, private projectService: ProjectService, private pragccService: PragccService) {
      this.project = new Project(undefined,'no description','no type');
      this.selectedFile = new File(undefined,undefined,'somefile','somefiletype','');
      this.previewFile = new File(undefined,undefined,'somefile','somefiletype','');
      this.textarea_log_text = "Welcome to web coder !!\n";
      this.editor_mode = 'c_cpp';
  }

  /**
   * Whe the component is initialized this method is called
   * to obtain the project id arguments pased to this 
   * component by URL.
   */
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
      error => {
        this.appendLogText("The project can not be loaded !!");
        console.log("The project can not be loaded !!");
        console.log(error);
      },
      () => {
        this.appendLogText("The project was loadded successfully !!")
      }
    );
  }

  loadFiles(): void {
    this.files = this.fileService.getFilesFromProject(this.project_id);
    this.setPreviewFile();
  }

  setPreviewFile(): void {
    this.files.forEach(files =>{
      files.forEach(file => {
        if(file.name == 'omp.c')
          this.previewFile = file;
      });
    });
  }

  setSelectedFile(file: File): void {
    this.selectedFile = file;
    /* Changing the editor highlighting mode */
    if(file.ftype == 'yml')
      this.editor_mode = 'yaml';
    else{
      this.editor_mode ='c_cpp';
    }
  }

  /* Send changes from the current selected file to the API */
  onSaveFile(): void {
    this.fileService.updateFile(this.selectedFile).subscribe(
      response => console.log(response),
      error => this.errorHandler(error),
      () => this.appendLogText("The file was saved successfully !!")
    );
  }

  onCompileFile(): void {
    this.pragccService.compileFile(this.selectedFile).subscribe(
      response => console.log(response),
      error => this.errorHandler(error),
      () => this.appendLogText('The compilation was successfull !!')
    );
  }

  onDawnCC() : void {
    this.appendLogText('This feature is not available yet !!');
  }

  onPragccOpenMP(): void {
    this.pragccService.annotateOpenMP(this.selectedFile).subscribe(
      response => console.log(response),
      error => this.errorHandler(error),
      () => {
        /* We tell he user the paralleization was succesfull*/
        this.appendLogText('Code parallelization successfull !!');
        /* Then we reload the files in the file selector */
        this.loadFiles();
      }
    );
  }

  errorHandler(error): void {
    if(error.status == 0){
      this.appendLogText('The API server is not running !!');
    }else if(error.status == 400){
      //this.appendLogText('The code has some errors !!');
      this.appendLogText(error.text());
    }else{
      this.appendLogText('An unknown error has ocurred !!');
      console.log('An unknown error has ocurred !!');
      console.log(error);
    }
  }

  appendLogText(text:string): void {
    // this.textarea_log_text += text + '\n';
    this.textarea_log_text = text + '\n';
    // To make the scroll moves down whe messages fill all text area heigh
    var text_area_element = document.getElementById('text-area');
    text_area_element.scrollTop = text_area_element.scrollHeight;   
  }


}
