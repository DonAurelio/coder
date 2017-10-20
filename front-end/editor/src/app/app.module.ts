import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AceEditorModule } from 'ng2-ace-editor';

import { CafileService } from './services/cafile.service';
import { ProjectService } from './services/project.service';
import { FileService } from './services/file.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { CaeditorComponent } from './caeditor/caeditor.component';
import { CafileFormComponent } from './caeditor/cafile-form/cafile-form.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectListComponent } from './project-manager/project-list/project-list.component';
import { ProjectCreateComponent } from './project-manager/project-create/project-create.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ProjectFileListComponent } from './code-editor/project-file-list/project-file-list.component';
import { AceCodeEditorComponent } from './code-editor/ace-code-editor/ace-code-editor.component';
import { ConsoleComponent } from './code-editor/console/console.component';


const appRoutes: Routes = [
  { path: '', redirectTo:'/project', pathMatch: 'full' },
  { path: 'project', component: ProjectManagerComponent },
  { path: 'project/edit/:id', component: CodeEditorComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CaeditorComponent,
    CafileFormComponent,
    ProjectManagerComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    CodeEditorComponent,
    ProjectFileListComponent,
    AceCodeEditorComponent,
    ConsoleComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AceEditorModule
  ],
  providers: [CafileService,ProjectService,FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
