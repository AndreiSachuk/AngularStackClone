import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../../auth/shared-auth.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  constructor(public auth: SharedAuthService) { }



  ngOnInit(): void {
  }

}
