import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  getProjects(): Observable<Project[]> {
    /* We parse the response to a json object and look for the list of objects returned 
    by the list call to the api endpoint */
    return this.http.get('http://localhost:8000/api/v1/project/')
    .map((response: Response) => response.json()['objects']);
  } 

}
