import { Component, OnInit, Input } from '@angular/core';
import { Cafile } from '../../models/cafile';
@Component({
  selector: 'app-cafile-form',
  templateUrl: './cafile-form.component.html',
  styleUrls: [
    './cafile-form.component.css'
  ]
})
export class CafileFormComponent implements OnInit {
  /* Takes an input from passed from the parent component */ 
  @Input() cafile : Cafile;
  patterns_name : string[];
  states_types : string[];
  
  constructor() { 
    this.patterns_name = ['stencil','other'];
    this.states_types = ['int','bool','float'];
  }

  ngOnInit() {
  }

}
