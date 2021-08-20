import {Component, OnInit} from '@angular/core';
import {SharedAuthService} from "../../services/shared-auth.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../interfaces";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  public userInfo: UserInfo = this.authService.getUserInfo()

  constructor(public authService: SharedAuthService,
              private routerService: Router,) {  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.signOut()
      .then(r => {
        this.routerService.navigate(['/sign-in'])
      })
  }

}
