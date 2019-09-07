import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/accounts/login/login.component';
import { SignupComponent } from './components/accounts/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/accounts/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/accounts/password/response-reset/response-reset.component';


const routes: Routes = [
  {
    path: 'accounts/login', 
    component: LoginComponent
  },
  {
    path: 'accounts/signup', 
    component: SignupComponent
  },
  {
    path: 'profile', 
    component: ProfileComponent
  },
  {
    path: 'accounts/password/reset', 
    component: RequestResetComponent
  },
  {
    path: 'accounts/password/response', 
    component: ResponseResetComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
