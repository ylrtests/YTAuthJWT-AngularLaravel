import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/accounts/login/login.component';
import { SignupComponent } from './components/accounts/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/accounts/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/accounts/password/response-reset/response-reset.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { Notfound404Component } from './components/notfound404/notfound404.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';


const routes: Routes = [
  {
    path: 'accounts/login', 
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'accounts/signup', 
    component: SignupComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'accounts/password/reset', 
    component: RequestResetComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'accounts/password/response', 
    component: ResponseResetComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  },
  //Error Page 404
  { path: '**', component: Notfound404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
