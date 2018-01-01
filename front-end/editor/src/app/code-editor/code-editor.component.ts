import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { File } from '../models/file';
import { FileService } from '../services/file.service';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { PragccService } from '../services/pragcc.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute,private fileService: FileService, private projectService: ProjectService, private pragccService: PragccService) {
      this.project = new Project(undefined,undefined,'no description','no type');
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
      response => {
        this.project = response;
      },
      error => {
        this.toastService.error("The project ccould not be loaded !!");
        this.appendLogText("The project ccould not be loaded !!");
        console.log("The project ccould not be loaded !!");
        console.log(error);
      },
      () => {
        this.toastService.info("The project was loadded sucessfully");
        this.appendLogText("The project was loadded sucessfully");
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
      response_body => {
        // this.appendLogText(response_body['message']);
      },
      error_body => {
        // Django tastipye returns an error with the following format
        // {'error_message':'.....', 'traceback': '....'}
        // Handled errors in server follows this format
        // {'message':'....','error':'.....'} 
        this.toastService.error(error_body.message);
        this.appendLogText(error_body.error_message || error_body.error);
        console.log('onSaveFile Error',error_body.message,error_body.error_message);
      },
      () => {
        // When no erros happend do some work here
        this.toastService.success('The file was saved successfully !!');
        this.appendLogText('The file was saved successfully !!');
      }
    );
  }

  /**
   * Perform file compilation in a remote server.
   */
  onCompileFile(): void {
    this.pragccService.compileFile(this.selectedFile).subscribe(
      response_body => {
        this.toastService.success(response_body['message']);
        this.appendLogText(response_body['message']);
      },
      error_body => {
        // this.appendLogText(error_body.message);
        this.toastService.error(error_body.message);
        this.appendLogText(error_body.error || error_body.message );
        // console.log('onCompileFile Error',error_body.error);
      },
      () => {
        // When no erros happend do some work here
      }
    );
  }

  /**
   * Perfoms file parallelization in a remote server
   * NOT AVAILABLE YET
   */
  onDawnCC() : void {
    this.toastService.warning('This Dawncc feature is not available yet !!');
    this.appendLogText('This feature is not available yet !!');
  }

  /**
   * Perfoms file paralellization in a remote server, but 
   * this tell the server to parallelize with OpenMP directives
   */
  onOpenMP(): void {
    this.pragccService.annotateOpenMP(this.selectedFile).subscribe(
      response_body => {
        this.toastService.info(response_body['message']);
        this.appendLogText(response_body['message']);
      },
      error_body => {
        this.toastService.error(error_body.message);
        this.appendLogText(error_body.error || error_body.message);
        console.log('onOpenMP Error',error_body.error);
      },
      () => {
        /* We tell he user the paralleization was succesfull*/
        this.toastService.success("The code was parallelized successfully !!");
        this.appendLogText("The code was parallelized successfully !!");
        /* Then we reload the files in the file selector */
        this.loadFiles();
      }
    );
  }

  /**
   * Allow display messages in the code editor console
   * @param text The text to be displayed in the code editor console
   */
  appendLogText(text:string): void {
    // this.textarea_log_text += text + '\n';
    this.textarea_log_text = text + '\n';
    // To make the scroll moves down whe messages fill all text area heigh
    // var text_area_element = document.getElementById('text-area');
    // text_area_element.scrollTop = text_area_element.scrollHeight;   
  }


}
