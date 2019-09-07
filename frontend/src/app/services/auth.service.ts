import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_API: String = "http://localhost:8000/api"

  constructor(
    private http: HttpClient
  ) { }

  logIn(user: User): Observable<User>{
    return this.http.post<User>(`${this.URL_API}/auth/login`, user)
  }

  

}