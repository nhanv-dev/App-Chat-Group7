import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public isUserAuthenticated: boolean = false;

  constructor() {
  }

  getToken() {
    const token: any = localStorage.getItem('userData')
    return JSON.parse(token);
  }

  setToken(token: string) {
    this.isUserAuthenticated = true;
    localStorage.setItem('userData', token);
  }

  removeToken() {
    this.isUserAuthenticated = false;
    localStorage.removeItem('userData');
  }

}
