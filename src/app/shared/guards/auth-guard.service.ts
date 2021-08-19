import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SharedAuthService} from "../services/shared-auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: SharedAuthService,
              private route: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
    {
      return this.auth.checkAuth().pipe(
        map((user) => {
          if (!!user) {
            return true
          }
          this.route.navigate(['/sign-in'])
          return false
        })
      )
    }
  }
}
