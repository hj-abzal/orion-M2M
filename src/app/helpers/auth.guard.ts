import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.checkAuthenticated();
    if (currentUser.login) {
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}} );
    return true
  }
}
