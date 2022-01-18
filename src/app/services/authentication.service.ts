import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private router: Router) { 
  }


  checkAuthenticated() {
    const authenticated = JSON.parse(localStorage.getItem('currentUser') || '{}') 
    return authenticated;
  }


  login(login: string, password: string) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicGVybWlzc2lvbnMiOjU4NzI1Nzh9.KfQtoH4rGYdGXP5I7l-po1AmemzuxcuQJ-6AR7QrRpE'
    const user = {login, password, token}
    localStorage.setItem('currentUser', JSON.stringify(user));
    return token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login'])
  }
}
