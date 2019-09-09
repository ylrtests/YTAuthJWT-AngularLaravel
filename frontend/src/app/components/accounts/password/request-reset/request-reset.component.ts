import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  private errorMessage:string = "Something went wrong";
  private hasError: boolean = false;
  private form = {
    email: ''
  }

  constructor(
    private authService: AuthService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.sendPasswordResetLink(this.form).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err) 
    )
  }

  handleResponse(res){
    this.snotifyService.success('We sent you an email', 'Success', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true
    });
  }

  handleError(err){
    this.form.email = null;
    this.hasError = true;
    this.snotifyService.error(err.error.error)
  }

  onCloseAlert(){
    this.hasError = false;
  }

}
