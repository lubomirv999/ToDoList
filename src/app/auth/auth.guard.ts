import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private location: Location) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }

  async check() {
    let isLogged: boolean = false;
    await this.authService.isAuthenticated().then((tokenExists) => {
      isLogged = tokenExists;
    });

    if (isLogged) {
      return true;
    } else {
      this.location.replaceState('home');
      this.location.go('home');
      this.location.back();
      return false;
    }
  }
}