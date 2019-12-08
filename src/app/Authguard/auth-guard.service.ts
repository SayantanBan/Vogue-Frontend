import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../Shared/Services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private userService: UserService, public jwtHelper: JwtHelperService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.jwtHelper.isTokenExpired(this.userService.accessToken)) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
