import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { User } from '../models/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(this.tokenService.isValid()); 
  private headers: HttpHeaders = new HttpHeaders();

  URL_API: String = "http://apiAngularLaravelJWT:8080/api/auth";
  

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  logIn(user: User): Observable<User>{
    return this.http.post<User>(`${this.URL_API}/login`, user)
  }

  signUp(user: User): Observable<User>{
    return this.http.post<User>(`${this.URL_API}/signup`,user)
  }

  logOut(){
    this.headers = this.headers.append('Authorization','Bearer '+this.tokenService.getToken());
    this.tokenService.removeToken();
    this.changeAuthStatus(false);
    return this.http.post(`${this.URL_API}/logout`, null, {headers: this.headers})
  }

  me(){
    this.headers = this.headers.append('Authorization','Bearer '+this.tokenService.getToken());
    return this.http.post<User>(`${this.URL_API}/me`,{ headers: this.headers })
  }

  changeAuthStatus(value: boolean){
    this._isLoggedIn.next(value);
  }

  get isLoggedIn(){
    return this._isLoggedIn
  }

}
