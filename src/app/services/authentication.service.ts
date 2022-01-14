import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private curruntUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() { 
    //@ts-ignore
    this.curruntUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.curruntUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.curruntUserSubject.value
  }

  login(login: string, password: string) {
    const user = {login, password}
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.curruntUserSubject.next(user)
    console.log(user);
    
    return user;
    
  }

  logout() {
    localStorage.removeItem('currentUser');
    //@ts-ignore
    this.curruntUserSubject.next(null);
  }
}
