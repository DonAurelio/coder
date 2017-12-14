import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { File } from "../models/file";

@Injectable()
export class PragccService {

  // The url to the catt service
  api: string;

  constructor(private http: Http) { 
  	this.api = 'http://localhost:8000/api/pragcc';
  }

  /**
   * Check if a file can be compiled
   * @param file the file to be compiled
   */
  compileFile(file: File): Observable<Object> {
    var resource = 'compiler';
    var action = 'compile';
    var id = file.id;
    var url = `${this.api}/${resource}/${action}/files/${id}`;
    var body = {};
    return this.http.post(url,body)
    .map((response: Response) => response.json());
  }

  annotateOpenMP(file: File): Observable<Object> {
    var resource = 'openmp';
    var action = 'parallelize';
    var target = `files/${file.id}`;
    var url = `${this.api}/${resource}/${action}/${target}`;
    var body = {};
    return this.http.post(url,body)
    .map((response: Response) => response.json())
  }

  /**
   * The Pragcc service in the backend
   * annotate the project .c file with 
   * openmp compiler directives.
   * @param project details of the current editing project
   */
  // annotateCCode(project: Object): Observable<Object>{
  //   const resource = 'templates';
  //   const url = `${this.api}/${resource}`;
  //   var data = {
  //     'cafile': Cafile,
  //     'project':project
  //   };
  //   return this.http.post(url,data)
  //   .map((response: Response) => response.json())
  //   .catch((error: any)=> Observable.throw(error.json().error || { message:" Server error !! "}));
  // }

}