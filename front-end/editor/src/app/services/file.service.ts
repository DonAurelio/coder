import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { File } from "../models/file";


@Injectable()
export class FileService {

  // the API base url 
  api: string;
  // the URL of the resource we require from the api
  resource: string;

  constructor(private http: Http) { 
    this.api = 'http://localhost:8000/api/editor';
    this.resource = 'files';
  }

  getFilesFromProject(id: string): Observable<File[]> {
    var url = `${this.api}/${this.resource}?project=${id}`;
    return this.http.get(url).map(
      (response: Response) => response.json()['objects']
    );
  }

  updateFile(file: File): Observable<File> {
    /* The endding slash is mandatory o put method */
    var url = `${this.api}/${this.resource}/${file["id"]}/`;
    return this.http.put(url,file)
    .map((response: Response) => response.json());
  }



}
