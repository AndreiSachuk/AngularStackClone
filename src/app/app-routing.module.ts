import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeadComponent} from "./shared/components/head/head.component";
import {SignComponent} from "./auth/signin/sign.component";
import {DashboardComponent} from "./main/dashboard/dashboard.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AuthGuard} from "./shared/services/auth-guard.service";
import {LogGuard} from "./shared/services/log.guard";



const routes: Routes = [
  {
    path: '', component: HeadComponent, children: [
      {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
      {path: 'sign-in', component: SignComponent, canActivate: [LogGuard]},
      {path: 'sign-up', component: SignUpComponent,  canActivate: [LogGuard]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
