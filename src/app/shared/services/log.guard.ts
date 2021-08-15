import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SharedAuthService} from "./shared-auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {
  constructor( private authService: SharedAuthService,
               private routerService: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
    {
      return this.authService.checkAuth().pipe(
        map((user) => {
          if (!!user) {
            this.routerService.navigate(['/dashboard'])
            return false

          }
          return true
        })
      )
    }
  }
}
