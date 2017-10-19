import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ace-code-editor',
  templateUrl: './ace-code-editor.component.html',
  styleUrls: ['./ace-code-editor.component.css']
})
export class AceCodeEditorComponent implements OnInit {

  /* Binding with the text typed in the editor */
  editor_text: string = "Editor text";
  preview_text: string = "Preview text";

  constructor() { }

  ngOnInit() {
  }

  onChange(event:any): void {
    console.log("Something changed in code !!");
    console.log(event);
  }

}
