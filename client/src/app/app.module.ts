import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AceEditorModule } from 'ng2-ace-editor';

import { TemplateService } from './services/templates.service';
import { ProjectService } from './services/project.service';
import { FileService } from './services/file.service';
import { PragccService } from './services/pragcc.service';
import { ConfigService } from './services/config.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { path: '', redirectTo:'/project', pathMatch: 'full' },
  { path: 'project', component: ProjectManagerComponent },
  { path: 'project/edit/:id', component: CodeEditorComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectManagerComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    CodeEditorComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AceEditorModule,
    
    CommonModule, // Required for ToastModule
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [ProjectService,FileService,TemplateService,PragccService,ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
