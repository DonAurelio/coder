import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { File } from "../../models/file";
import { FileService } from "../../services/file.service";

@Component({
  selector: 'app-project-file-list',
  templateUrl: './project-file-list.component.html',
  styleUrls: ['./project-file-list.component.css']
})
export class ProjectFileListComponent implements OnInit {

  @Input() project_id : any;
  project : Project;

  project_files: Observable<File[]>;
  selectedFile: File;

  constructor(private projectService: ProjectService, private fileService: FileService) {
    this.project = new Project(0,'','');

  }

  ngOnInit() {
    this.loadProject();
    this.loadProjectFiles();
  }

  loadProject(): void {
    this.projectService.getProjectById(this.project_id).subscribe(
      response => this.project = response,
      error => console.log("An error has ocurred in project-file-list"),
      () => console.log("Success !!")
    );
  }

  loadProjectFiles(): void {
    this.project_files = this.fileService.getFilesFromProject(this.project_id);
  }

  setSelectedFile(file: File): void {
    this.selectedFile = file;
  }

}
