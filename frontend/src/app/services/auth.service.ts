import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_API: String = "http://apiAngularLaravelJWT:8080/api/auth";
  headers: HttpHeaders;

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

  me(){
    const token = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      'Authorization': 'bearer '+token
    });
    return this.http.post<User>(`${this.URL_API}/me`, this.headers)
  }

  

}
