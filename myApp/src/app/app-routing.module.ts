import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SigninComponent} from './signin/signin.component'
import {SignupComponent} from './signup/signup.component'
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminHeaderComponent} from './admin-dashboard/admin-header/admin-header.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {SkillsFormComponent} from './registration-form/skills-form/skills-form.component';
import {JobsNewsComponent} from './admin-dashboard/jobs-news/jobs-news.component';
import {ViewProfileComponent} from './admin-dashboard/view-profile/view-profile.component';
import {JobsStatusComponent} from './admin-dashboard/jobs-status/jobs-status.component';
import {WorkStatusComponent} from './admin-dashboard/work-status/work-status.component';
import {AdminHomeComponent} from './admin-dashboard/admin-home/admin-home.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import { AuthGuard } from './dashboard/auth.guard';
import { EmailVerifiedComponent } from './email-verified/email-verified.component'

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'dashboard'
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'signin',component:SigninComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'admin-dashboard',component:AdminDashboardComponent, canActivate: [AuthGuard]
  },
  {
    path:'admin-header',component:AdminHeaderComponent, canActivate: [AuthGuard]
  },
  {
    path: 'registration-form',component:RegistrationFormComponent
  },
  {
    path: 'skills-form',component:SkillsFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'job-news',component:JobsNewsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'view-profile',component:ViewProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'jobs-status',component:JobsStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'work-status',component:WorkStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-home',component:AdminHomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'forget-password',component:ForgetPasswordComponent
  },
  {
    path: 'emailVerified',component:EmailVerifiedComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
