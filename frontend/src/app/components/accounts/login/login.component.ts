import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

import { AuthService } from '../../../services/auth.service'
import { NgxSpinnerService } from "ngx-spinner";

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.spinner.show();
    this.authService.logIn(this.user).subscribe( 
      (data) =>{
        console.log(data)
        this.spinner.hide();
      },
      (error) => {
        this.handleError(error);
      })
  }

  handleError(error){
    this.spinner.hide();
    this.errorMessage = error.error.error;
    this.hasError = true;
  }

  onCloseAlert(){
    this.hasError = false;
  }

}
