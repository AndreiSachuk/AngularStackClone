import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SharedAuthService} from "./shared-auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: SharedAuthService,
              private route: Router) {
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (this.auth.isAuthentificated()) {
      return true
    } else {
      this.route.navigate(['/sign-in'])
      return false
    }

  }

}
