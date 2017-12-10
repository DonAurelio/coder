import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Project } from '../models/project';
import { Cafile } from '../models/cafile';

@Injectable()
export class CattService {

  // The url to the catt service
  api: string;

  constructor(private http: Http) {
    this.api = 'http://localhost:8000/external-service/catt';
  }

  /**
   * The Catt service in the backend create
   * a project with the given project data
   * and creae initial files with the given 
   * cafile settings.
   * @param project details of the project
   * @param cafile settings to the ceelular automata template
   */
  addProject(project: Object, cafile:Object): Observable<Object>{
    const resource = 'templates';
    const url = `${this.api}/${resource}`;
    var data = {
      'cafile':cafile,
      'project':project
    }
    return this.http.post(url,data)
    .map((response: Response) => response.json())
    .catch((error: any)=> Observable.throw(error.json().error || { message:" Server error !! "}));
  }
}
