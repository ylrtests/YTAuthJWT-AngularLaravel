import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/accounts/login/login.component';
import { SignupComponent } from './components/accounts/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/accounts/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/accounts/password/response-reset/response-reset.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

//Services
import { AuthService } from './services/auth.service'

//Externals
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ], 
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
