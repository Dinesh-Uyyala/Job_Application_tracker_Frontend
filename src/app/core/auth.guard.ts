import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      alert('You must be logged in to access this page.');
      return false;
    }
    const roles = route.data['roles'] as Array<string>;
    if (roles && !roles.includes(this.auth.role)) {
      this.router.navigate(['/']);
      alert('You do not have permission to access this page.');
      return false;
    }
    return true;
  }
}