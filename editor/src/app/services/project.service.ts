import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProjectService {

  // the API base url 
  api: string;
  // the URL of the resource we require from the api
  resource: string;

  constructor(private http: Http) { 
    this.api = 'http://localhost:8000/api/project';
    this.resource = 'projects';
  }

  /**
   * Retrieve a list of project objects from an API.
   */
  getProjects(): Observable<Project[]> {
    /* We parse the response to a json object and look for the list of objects returned 
    by the list call to the api endpoint */
    var url = `${this.api}/${this.resource}`;
    return this.http.get(url)
    .map((response: Response) => response.json()['objects']);
  }

  /**
   * Retrieve a project given its id.
   * @param id project id
   */
  getProjectById(id: String): Observable<Project>{
    var url = `${this.api}/${this.resource}/${id}`;
    return this.http.get(url)
    .map((response: Response) => response.json());
  }

  /**
   * Update a project on the API
   * @param project the project data
   */
  updateProject(project: Object): Observable<Project[]>{
    const apiUrl = 'http://localhost:8000/api/v1/project';
    const url = `${apiUrl}/${project["id"]}`;
    return this.http.put(url,project)
    .map((response: Response) => response.json());
  }

  /**
   * Delete the project from the API database
   */
  deleteProject(project: Object): Observable<Object>{
    var url = `${this.api}/${this.resource}/${project["id"]}/`;
    return this.http.delete(url);
  }

}