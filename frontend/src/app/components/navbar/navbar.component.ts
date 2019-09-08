import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLogged: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      (value) => {this.isLogged = value}
    )
  }

  onLogOut(event: MouseEvent){
    this.spinner.show();
    event.preventDefault();
    console.log("Try to log out...")
    this.authService.logOut().subscribe(
      () => {
        console.log("Cerro sesión");
        this.spinner.hide();
        this.router.navigateByUrl(this.authService.loginUrl);
      },
      (err) => {
        console.log("Error cerrando sesión")
        console.log(err)
        this.spinner.hide();
        this.router.navigateByUrl(this.authService.loginUrl);
      }
    );
  }

}
