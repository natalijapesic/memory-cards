import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../../users/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user) {
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(user.role) === -1
      ) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/sign-in'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
