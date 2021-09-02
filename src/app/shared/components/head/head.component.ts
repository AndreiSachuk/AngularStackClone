import {Component, OnInit} from '@angular/core';
import {SharedAuthService} from "../../services/shared-auth.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../interfaces";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ThemeService} from "../../services/theme.service";
import {appThemesArray} from "../../constants";


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
    themeService.getThemeArr().subscribe(data => {
      appThemesArray
        .filter(theme => theme != data)
        .forEach(delThemeClass => overlayContainer.getContainerElement().classList.remove(delThemeClass))
      overlayContainer.getContainerElement().classList.add(data);
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

  changeThemeArr() {
    this.themeService.setTheme()
  }

}
