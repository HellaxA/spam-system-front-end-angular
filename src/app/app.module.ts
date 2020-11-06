import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserViewComponent } from './user-view/user-view.component';
import { HttpClientModule } from '@angular/common/http';
import {Routes} from "@angular/router";
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SendFormComponent } from './send-form/send-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    UserFormComponent,
    SendFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
