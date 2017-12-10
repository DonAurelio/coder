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
  neighborhood_names: string[];
  nbhds_patterns: {};
  
  constructor() { 
    this.patterns_name = ['stencil','other'];
    this.states_types = ['int','bool','float'];
    this.neighborhood_names = ['neumann','moore'];

    this.nbhds_patterns = {
      'neumann': [
        [" "," "," "," "," "],
        [" "," ","1"," "," "],
        [" ","1","1","1"," "],
        [" "," ","1"," "," "],
        [" "," "," "," "," "],
      ],
      'moore': [
        [" "," "," "," "," "],
        [" ","1","1","1"," "],
        [" ","1","1","1"," "],
        [" ","1","1","1"," "],
        [" "," "," "," "," "],
      ]
    };
  }

  getCurrentNeighborPattern(){
    return this.nbhds_patterns[this.cafile.nbhd_name];
  }

  ngOnInit() {
  }

  onSubmit(){

    
  }

}
