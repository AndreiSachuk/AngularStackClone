import {Component, OnInit} from '@angular/core';
import {SharedAuthService} from "../../services/shared-auth.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../interfaces";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ThemeService} from "../../services/theme.service";
import {AppThemes} from "../../constants";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  public userInfo: UserInfo = this.authService.getUserInfo()

  constructor(public authService: SharedAuthService,
              private routerService: Router,
              private overlayContainer: OverlayContainer,
              private themeService: ThemeService,
              ) {
    themeService.getTheme().subscribe(data => {
      if (data === AppThemes.light) overlayContainer.getContainerElement().classList.remove(AppThemes.dark);
      else overlayContainer.getContainerElement().classList.add(AppThemes.dark);
    });
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.signOut()
      .then(r => {
        this.routerService.navigate(['/sign-in'])
      })
  }

  changeTheme() {
    this.themeService.toggleTheme()
  }
}
