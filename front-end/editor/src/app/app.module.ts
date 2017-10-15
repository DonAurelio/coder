import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { CaeditorComponent } from './caeditor/caeditor.component';
import { CafileFormComponent } from './caeditor/cafile-form/cafile-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CaeditorComponent,
    CafileFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
