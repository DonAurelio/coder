import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Project } from '../models/project';
import { Context } from '../models/context';
import { ConfigService } from '../services/config.service';

@Injectable()
export class TemplateService {

  // Server base url
  base_url: string;
  // The url to the catt service
  api: string;

  constructor(private configService: ConfigService, private http: Http) {
    this.api = `${this.configService.templates_service.url}/api/template`;
  }

  /**
   * The Catt service in the backend create
   * a project with the given project data
   * and creae initial files with the given 
   * cafile settings.
   * @param project details of the project
   * @param cafile settings to the ceelular automata template
   */
  addProject(project: Object, context:Context): Observable<Object>{
    const resource = 'templates';
    const url = `${this.api}/${resource}`;
    var data = {
      'context': context.data(),
      'project': project
    }

    return this.http.post(url,data)
    // .map((response: Response) => response.json());
    // Returns the body of the response in json format if no errors happend, 
    // it is to say response comes with 200 status code. 
    .map((response: Response) => response.json())
    // Returns the body of the response in json format if some error happend, 
    // it si to say, the response status is not 200.
    // When response status code is 0, the remote server is no running.
    .catch((error:any) => Observable.throw( 
      (error.status == 0) ? {'message':'The API server is not running'}:error.json()  
    ));
  }
}
