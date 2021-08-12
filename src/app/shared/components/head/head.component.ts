import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../../auth/shared-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {


  constructor(public auth: SharedAuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.signOut()
      .then(r => {
        this.router.navigate(['/sign-in'])
      })
  }

}
