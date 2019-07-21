# Coder Client

This container servers an angular capable user interface. It needs to know where the server side is exposing the service to be consumed. Please check "/coder/client/src/app/services/config.service.ts" file cofiguration has the server location before build the container.

```js
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
    this.pragcc_service = {'url': 'http://localhost:8011'};
    this.file_service = {'url': 'http://localhost:8011'};
    this.project_service = {'url': 'http://localhost:8011'};
    this.templates_service = {'url': 'http://localhost:8011'};
  }

}
```

# About Angular Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
