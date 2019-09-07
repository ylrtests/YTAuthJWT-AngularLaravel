import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://apiangularlaraveljwt:8080/api/auth/login',
    signup: 'http://apiangularlaraveljwt:8080/api/auth/signup'
  }

  constructor() { }

  handle(token){
    this.setToken(token);
    console.log("payload...")
    console.log(this.getDecodedPayload(token))
    console.log(this.isValid())
  }

  setToken(token){
    localStorage.setItem('access_token',token);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  removeToken(){
    localStorage.removeItem('access_token');
  }

  isValid(){
    const token = this.getToken()
    if(token){
      const payload = this.getDecodedPayload(token);
      return Object.values(this.iss).indexOf(payload.iss) > -1  ? true : false;
    }
    else{
      return false;
    }
  }

  getDecodedPayload(token){
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

}
