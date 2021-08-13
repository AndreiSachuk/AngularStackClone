import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./shared/material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignComponent } from './auth/signin/sign.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { HeadComponent } from './shared/components/head/head.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {HttpClientModule} from "@angular/common/http";
import { DialogComponent } from './shared/components/dialog/dialog.component';
import firebase from "firebase/app";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import {MatDialogModule} from "@angular/material/dialog";

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    DashboardComponent,
    HeadComponent,
    SignUpComponent,
    DialogComponent,
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp( environment.firebase),
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
