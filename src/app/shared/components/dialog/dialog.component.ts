import { Component, OnInit } from '@angular/core';
import {ErrService} from "../../services/err.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  constructor(public errService: ErrService) { }



  ngOnInit(): void {
  }

}
