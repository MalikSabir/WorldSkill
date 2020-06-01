import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './services/apiservice.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-dashboard/admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-dashboard/admin-home/admin-home.component';
import { AdminViewInboxComponent } from './admin-dashboard/admin-view-inbox/admin-view-inbox.component';
import { ViewFeedbackComponent } from './admin-dashboard/view-feedback/view-feedback.component';
import { UpdateSkillTypeComponent } from './admin-dashboard/update-skill-type/update-skill-type.component';
import { CheckReportsComponent } from './admin-dashboard/check-reports/check-reports.component';
import { AdminSearchPeopleComponent } from './admin-dashboard/admin-search-people/admin-search-people.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { FormHeaderComponent } from './form-header/form-header.component';
import { SkillsFormComponent } from './registration-form/skills-form/skills-form.component';
import { AuthInterceptor } from './dashboard/auth-interceptor';
import { ViewProfileComponent } from './admin-dashboard/view-profile/view-profile.component';
import { JobsNewsComponent } from './admin-dashboard/jobs-news/jobs-news.component';
import { JobsStatusComponent } from './admin-dashboard/jobs-status/jobs-status.component';
import { WorkStatusComponent } from './admin-dashboard/work-status/work-status.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminViewInboxComponent,
    ViewFeedbackComponent,
    UpdateSkillTypeComponent,
    CheckReportsComponent,
    AdminSearchPeopleComponent,
    RegistrationFormComponent,
    FormHeaderComponent,
    SkillsFormComponent,
    ViewProfileComponent,
    JobsNewsComponent,
    JobsStatusComponent,
    WorkStatusComponent,
    ForgetPasswordComponent,
    EmailVerifiedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
   providers: [ApiserviceService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
