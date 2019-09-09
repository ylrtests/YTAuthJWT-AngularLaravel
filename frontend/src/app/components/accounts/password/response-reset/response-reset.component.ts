import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/User'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  private user: User = {
    password: '',
    confirmPassword: '',
    resetToken: ''
  }

  private errorMessage: string = "Something's wrong."
  private hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.user.resetToken = params['token'];
    })
  }

  onSubmit(){
    console.log("Cambiare contraseña")
    this.authService.resetPassword(this.user).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    )
  }

  handleResponse(res){
    console.log(res);
    this.router.navigateByUrl(this.authService.loginUrl);
  }

  handleError(err){
    console.log(err)
    this.hasError = true;
    this.errorMessage = err.error.error;
    this.snotifyService.error('Ejemplo');
  }

  onCloseAlert(){
    this.hasError = false;
  }

}
