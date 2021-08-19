import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeadComponent} from "./shared/components/head/head.component";
import {SignComponent} from "./auth/signin/sign.component";
import {DashboardComponent} from "./main/dashboard/dashboard.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AuthGuard} from "./shared/guards/auth-guard.service";
import {LogGuard} from "./shared/guards/log.guard";
import {UserComponent} from "./main/user/user.component";
import {AddQuestionComponent} from "./main/add-question/add-question.component";
import {QuestionPageComponent} from "./main/question-page/question-page.component";
import {EditQuestionComponent} from "./main/edit-question/edit-question.component";



const routes: Routes = [
  {
    path: '', component: HeadComponent, children: [
      {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
      {path: 'sign-in', component: SignComponent, canActivate: [LogGuard]},
      {path: 'sign-up', component: SignUpComponent,  canActivate: [LogGuard]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
      {path: 'user', component: UserComponent, canActivate: [AuthGuard], },
      {path: 'add-question', component: AddQuestionComponent, canActivate: [AuthGuard], },
      {path: 'question/:id', component: QuestionPageComponent, canActivate: [AuthGuard], },
      {path: 'question/:id/edit', component: EditQuestionComponent, canActivate: [AuthGuard], },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
