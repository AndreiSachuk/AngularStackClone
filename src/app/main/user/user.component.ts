import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private authService: SharedAuthService) { }

  userInfo = this.authService.getUserInfo()

  ngOnInit(): void {


  }

}
