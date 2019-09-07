import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.spinner.show();
    console.log("Llevo formulario")
    console.log(this.user)
    this.authService.signUp(this.user).subscribe( 
      (data) =>{
        console.log(data);
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
