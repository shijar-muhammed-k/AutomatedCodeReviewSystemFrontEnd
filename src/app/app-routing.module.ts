import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './end-user/component/home/home.component';
import { LoginComponent } from './auth/component/login/login.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { ProfileComponent } from './end-user/component/profile/profile.component'
import { ReportComponent } from './end-user/component/report/report.component'
import { authGuard } from './core/guard/auth.guard'
import { MessagesComponent } from './admin/component/messages/messages.component';
import { RevenueComponent } from './admin/component/revenue/revenue.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'records', component: ReportComponent, canActivate: [authGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [authGuard]},
  {path: 'revenue', component: RevenueComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
