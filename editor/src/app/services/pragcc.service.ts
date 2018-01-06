import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { File } from "../models/file";

/**
 * Pragcc server deals with code compilation and 
 * parallelization with OpenMP and OpenACC directives
 */
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

  /**
   * Tells the api server to parallelize the given file with OpenMP directives
   * @param file the file to be annotated with OpenMP compiler directives
   */
  annotateOpenMP(file: File): Observable<Object> {
    var resource = 'openmp';
    var action = 'parallelize';
    var target = `files/${file.id}`;
    var url = `${this.api}/${resource}/${action}/${target}`;
    var body = {};
    return this.http.post(url,body)
    // .map((response: Response) => response.json())
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

  /**
   * Tells the api server to parallelize the given file with OpenMP directives
   * @param file the file to be annotated with OpenACC compiler directives
   */
  annotateOpenACC(file: File): Observable<Object> {
    var resource = 'openacc';
    var action = 'parallelize';
    var target = `files/${file.id}`;
    var url = `${this.api}/${resource}/${action}/${target}`;
    var body = {};
    return this.http.post(url,body)
    // .map((response: Response) => response.json())
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