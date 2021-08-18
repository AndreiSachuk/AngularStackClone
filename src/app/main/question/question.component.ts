import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../shared/interfaces";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;



  constructor(private authService:SharedAuthService,
              public sanitaizer: DomSanitizer) { }
  userInfo = this.authService.getUserInfo()

  ngOnInit(): void {

  }

}
