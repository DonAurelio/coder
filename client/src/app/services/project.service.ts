import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../services/config.service';
// File download
import { RequestOptions, ResponseContentType } from '@angular/http';
import { getFileNameFromResponseContentDisposition, saveFile } from '../helpers/file-download-helper';


@Injectable()
export class ProjectService {
  // the API base url 
  api: string;
  // the URL of the resource we require from the api
  resource: string;

  constructor(private configService: ConfigService,private http: Http) { 
    this.api = `${this.configService.project_service.url}/api/project`;
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
   * Delete the project from the API database
   */
  deleteProject(project: Object): Observable<Object>{
    var url = `${this.api}/${this.resource}/${project["id"]}/`;
    return this.http.delete(url);
  }

  /**
   * Project downloading
   * Reference: http://amilspage.com/angular4-file-download/
   * @param project the project to be downloaded form the server
   */
  downloadProject(project: Object): void {
    var url = `${this.configService.project_service.url}/project/${project['id']}/download`;
    const options = new RequestOptions({responseType: ResponseContentType.Blob });

    // Process the file downloaded
    this.http.get(url, options).subscribe(res => {
        saveFile(res.blob(), 'project.zip');
    });
  }

}
