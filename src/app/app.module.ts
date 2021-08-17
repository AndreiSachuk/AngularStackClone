import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./shared/material/material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignComponent} from './auth/signin/sign.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {HeadComponent} from './shared/components/head/head.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SignUpComponent} from './auth/sign-up/sign-up.component';

import {DialogComponent} from './shared/components/dialog/dialog.component';
import {environment} from "../environments/environment";

import {AngularFireModule} from "@angular/fire";
import {MatMenuModule} from "@angular/material/menu";
import {UserComponent} from './main/user/user.component';
import {QuestionPageComponent} from './main/question-page/question-page.component';
import {AddQuestionComponent} from './main/add-question/add-question.component';
import {QuillModule} from "ngx-quill";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    DashboardComponent,
    HeadComponent,
    SignUpComponent,
    DialogComponent,
    UserComponent,
    QuestionPageComponent,
    AddQuestionComponent,

  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatMenuModule,
    QuillModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
