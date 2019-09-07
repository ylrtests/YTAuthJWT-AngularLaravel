import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Llevo formulario")
    console.log(this.user)
    this.authService.signUp(this.user).subscribe( 
      (data) =>{
        console.log(data)
      },
      (error) => {
        this.handleError(error);
      })
  }

  handleError(error){
    this.errorMessage = error.error.error;
    this.hasError = true;
  }

  onCloseAlert(){
    this.hasError = false;
  }

}
