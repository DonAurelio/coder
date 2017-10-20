import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { File } from "../models/file";


@Injectable()
export class FileService {

  constructor(private http: Http) { }

  getFilesFromProject(id: string): Observable<File[]> {
    return this.http.get(`http://localhost:8000/api/v1/file?project=${id}`).map(
      (response: Response) => response.json()['objects']
    );
  }

}
