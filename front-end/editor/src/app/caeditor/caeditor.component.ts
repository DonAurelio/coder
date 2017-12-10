import { Component, OnInit, Input } from '@angular/core';
import { Cafile } from '../models/cafile';

@Component({
  selector: 'app-caeditor',
  templateUrl: './caeditor.component.html',
  styleUrls: ['./caeditor.component.css']
})
export class CaeditorComponent implements OnInit {
  cafile = new Cafile(20,20,'int',100,'neumann'); 
  
  constructor() { }

  ngOnInit() {
  }

}
