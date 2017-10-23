import { Component, OnInit } from '@angular/core';
import { File } from '../../models/file';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-ace-code-editor',
  templateUrl: './ace-code-editor.component.html',
  styleUrls: ['./ace-code-editor.component.css']
})
export class AceCodeEditorComponent implements OnInit {

  /* Binding with the text typed in the editor */
  editor_text: string = "Editor text";
  preview_text: string = "Preview text";

  file: File;

  constructor(private fileService: FileService) {
    this.file = new File(0,'Test File','c99','#include <stdio.h>');

  }

  ngOnInit() {
  }

  /* Getting the selected file from the file-list-componet */
  getSelectedFile(file: File): void {
    this.file = file;
    this.editor_text = file.text;
  }

  /* Save changes from the current selected file in the api */
  saveChanges(): void {
    this.fileService.updateFile(this.file).subscribe(
      success => console.log("The file was saved successfully !!"),
      error => console.log("Some error has ocurred !!"),
    );
  }



}
