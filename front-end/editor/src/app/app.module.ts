import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CafileService } from './services/cafile.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { CaeditorComponent } from './caeditor/caeditor.component';
import { CafileFormComponent } from './caeditor/cafile-form/cafile-form.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectListComponent } from './project-manager/project-list/project-list.component';
import { ProjectComponent } from './project-manager/project-list/project.component';
import { ProjectCreateComponent } from './project-manager/project-create/project-create.component';

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
    FormsModule
  ],
  providers: [CafileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
