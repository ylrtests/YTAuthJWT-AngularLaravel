import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from '../../../services/token.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private hasError: boolean = false;
  private errorMessage: string = "Something's wrong."
  private user: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

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
    this.authService.signUp(this.user).subscribe( 
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
