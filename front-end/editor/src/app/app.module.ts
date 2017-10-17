import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { CaeditorComponent } from './caeditor/caeditor.component';
import { CafileFormComponent } from './caeditor/cafile-form/cafile-form.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectListComponent } from './project-manager/project-list/project-list.component';
import { ProjectComponent } from './project-manager/project-list/project.component';
import { ProjectCreateComponent } from './project-manager/project-create/project-create.component';

import { CafileService } from './services/cafile.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CaeditorComponent,
    CafileFormComponent,
    ProjectManagerComponent,
    ProjectListComponent,
    ProjectComponent,
    ProjectCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CafileService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
