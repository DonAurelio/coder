import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-file-list',
  templateUrl: './project-file-list.component.html',
  styleUrls: ['./project-file-list.component.css']
})
export class ProjectFileListComponent implements OnInit {

  @Input() project_id : any;

  constructor() { }

  ngOnInit() {
  }

}
