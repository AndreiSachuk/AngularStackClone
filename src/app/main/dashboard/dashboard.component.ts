import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../auth/shared-auth.service";
import {userInfo} from "../../auth/interfaces";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private auth: SharedAuthService) { }

  userInfo: userInfo = this.auth.getUserInfo()
  public name = this.userInfo.name
  public uid = this.userInfo.uid
  public email = this.userInfo.email
  public photoUrl = this.userInfo.photoUrl

  ngOnInit(): void {


  }



}
