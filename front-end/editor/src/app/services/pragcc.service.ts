import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Project } from '../models/project';
import { Cafile } from '../models/cafile';

@Injectable()
export class PragccService {

  // The url to the catt service
  api: string;

  constructor(private http: Http) { 
  	this.api = 'http://localhost:8000/external-service/catt';
  }

  /**
   * The Pragcc service in the backend
   * annotate the project .c file with 
   * openmp compiler directives.
   * @param project details of the current editing project
   */
  annotateCCode(project: Object): Observable<Object>{
    const resource = 'templates';
    const url = `${this.api}/${resource}`;
    var data = {
      'cafile': Cafile,
      'project':project
    }
    return this.http.post(url,data)
    .map((response: Response) => response.json())
    .catch((error: any)=> Observable.throw(error.json().error || { message:" Server error !! "}));
  }

}