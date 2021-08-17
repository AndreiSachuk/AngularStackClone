import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  questions$: Observable<string[]>

  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService) { }

  userInfo = this.authService.getUserInfo()


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  categories = new FormControl();
  categoriesList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {
    this.questions$ = this.questionService.getAllQuestions()

  }



}
