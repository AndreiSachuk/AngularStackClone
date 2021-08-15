import { Component, OnInit } from '@angular/core';
import {ErrServiceService} from "../../services/err-service.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  constructor(public errService: ErrServiceService) { }



  ngOnInit(): void {
  }

}
