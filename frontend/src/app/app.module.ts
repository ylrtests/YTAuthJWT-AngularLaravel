import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/accounts/login/login.component';
import { SignupComponent } from './components/accounts/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/accounts/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/accounts/password/response-reset/response-reset.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { Notfound404Component } from './components/notfound404/notfound404.component';

//Services
import { AuthService } from './services/auth.service';

//Externals
import { NgxSpinnerModule } from "ngx-spinner";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    FavoritesComponent,
    Notfound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SnotifyModule
  ], 
  providers: [
    AuthService,
    SnotifyService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
