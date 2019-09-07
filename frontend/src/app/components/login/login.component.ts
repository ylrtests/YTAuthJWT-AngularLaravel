import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

import { AuthService } from '../../services/auth.service'

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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Llevo formulario")
    this.authService.logIn(this.user).subscribe( 
      (data) =>{
        console.log(data)
      },
      error => console.log(error))
  }

}
