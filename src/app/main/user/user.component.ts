import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {UserInfo} from "../../shared/interfaces";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: UserInfo

  constructor(private authService: SharedAuthService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo()
  }

}
