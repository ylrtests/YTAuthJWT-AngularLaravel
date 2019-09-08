import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from '../../../services/auth.service'
import { TokenService } from '../../../services/token.service';

import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = {
    email: '',
    password: ''
  }

  private errorMessage: string = "Something's wrong."
  private hasError: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.spinner.show();
    this.authService.logIn(this.user).subscribe( 
      data => this.handleResponse(data),
      error => this.handleError(error))
  }

  handleError(error){
    this.spinner.hide();
    this.errorMessage = error.error.error;
    this.hasError = true;
  }

  handleResponse(data){
    this.spinner.hide();
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  onCloseAlert(){
    this.hasError = false;
  }

}
