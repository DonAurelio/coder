import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ace-code-editor',
  templateUrl: './ace-code-editor.component.html',
  styleUrls: ['./ace-code-editor.component.css']
})
export class AceCodeEditorComponent implements OnInit {

  text: string = "";

  constructor() { }

  ngOnInit() {
  }

}
