import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo = this.authService.getUserInfo()

  constructor(private authService: SharedAuthService) { }

  ngOnInit(): void {
  }

}
