import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { File } from "../models/file";

/**
 * Allow File model CRUD
 */
@Injectable()
export class FileService {

  // the API base url 
  api: string;
  // the URL of the resource we require from the api
  resource: string;

  constructor(private http: Http) {
    // this.api = 'http://localhost:8000/api/project';
    this.api = 'http://localhost:8011/api/project';
    
    this.resource = 'files';
  }

  /**
   * Retrieve the files of a given project
   * @param id the project id
   */
  getFilesFromProject(id: string): Observable<File[]> {
    var url = `${this.api}/${this.resource}?project=${id}`;
    return this.http.get(url)
    // .map(
    //   (response: Response) => response.json()['objects']
    // );
    // Returns the body of the response in json format if no errors happend, 
    // it is to say response comes with 200 status code. 
    .map((response: Response) => response.json()['objects'])
    // Returns the body of the response in json format if some error happend, 
    // it si to say, the response status is not 200.
    // When response status code is 0, the remote server is no running.
    .catch((error:any) => Observable.throw( 
      (error.status == 0) ? {'message':'The API server is not running'}:error.json()  
    ));
  }

  /**
   * Update a File in the remote database
   * @param file the file to be updated
   */
  updateFile(file: File): Observable<File> {
    /* The endding slash is mandatory o put method */
    var url = `${this.api}/${this.resource}/${file["id"]}/`;
    return this.http.put(url,file)
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
