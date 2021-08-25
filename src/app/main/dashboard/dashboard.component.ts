import {Component, OnInit} from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {BehaviorSubject, Observable} from 'rxjs';
import {Question} from "../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {map, switchMapTo} from "rxjs/operators";
import {categories} from "../../shared/constants";
import {ErrService} from "../../shared/services/err.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  questions$: Observable<Question[]>
  userInfo = this.authService.getUserInfo()
  categories = new FormControl();
  categoriesList: string[] = categories
  checkCategoriesList = Object.assign({}, ...this.categoriesList.map(n => ({ [n]: false })))


  sorting: boolean = false;

  private request$ = new BehaviorSubject(true);
  private id: string;
  filters: boolean = false;
  settings: boolean = false;
  timeSelectDefault: string = 'All time'
  timeSelect: string
  timeCategories: string[] = ['Day', 'Week', 'Month', 'All time'];
  isDecisionSelectDefault: string = 'Does not matter';
  isDecisionSelect: string;
  isDecisionCategories: string[] = ['Yes', 'No', 'Does not matter'];

  checkboxCategories: FormGroup;

  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private errService: ErrService) {
    this.route.params.subscribe((param) => {
      this.id = param['id']
      this.request$.next(true)
    })

    this.questions$ = this.request$.pipe(
      switchMapTo(this.questionService.getAllQuestions()),
      map((questions: Question[]) => {
        return questions
      }));
  }

  ngOnInit(): void {
    this.timeSelect = this.timeSelectDefault
    this.isDecisionSelect = this.isDecisionSelectDefault
    this.checkboxCategories = this.formBuilder.group({
      ...this.checkCategoriesList
    });
  }

  onChanged() {
    this.request$.next(true)
  }

  filtersMenu(){
    this.filters = !this.filters
  }

  settingsMenu() {
    this.settings = !this.settings
  }






}
