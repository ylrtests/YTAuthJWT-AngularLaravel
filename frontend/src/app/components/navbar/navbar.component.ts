import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLogged: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      (value) => {this.isLogged = value}
    )
  }

  onLogOut(event: MouseEvent){
    event.preventDefault();
    console.log("Try to log out...")
    this.authService.logOut().subscribe(
      (res) => {
        console.log("cerro sesión")
        console.log(res)
      },
      (err) => {
        console.log("Error")
        console.log(err)
      }
    );
  }

}
