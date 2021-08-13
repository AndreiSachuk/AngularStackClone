import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SharedAuthService} from "./shared-auth.service";

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {
  constructor( private auth: SharedAuthService,
                private route: Router) {
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree>  {
    if (this.auth.isAuthentificated()) {
      this.route.navigate(['/dashboard'])
      return false
    } else {
      return true
    }

  }


}
