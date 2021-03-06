import { Injectable } from '@angular/core';

/**
 * Application settings
 */
@Injectable()
export class ConfigService {

  // Services settigs
  pragcc_service: any;
  file_service: any;
  project_service: any;
  templates_service: any;

  constructor() { 
    // A real deployment requiered the services be available 
    // over the internet by a DNS name.
    
    this.pragcc_service = {'url': 'http://coder_server:8000'};
    this.file_service = {'url': 'http://coder_server:8000'};
    this.project_service = {'url': 'http://coder_server:8000'};
    this.templates_service = {'url': 'http://coder_server:8000'};

  }

}
