import {Component, OnInit,} from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {BehaviorSubject, Observable} from 'rxjs';
import {Question} from "../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {switchMapTo} from "rxjs/operators";
import {
  categories,
  decisionCategories,
  decisionSelectDefault,
  isMyQuestion,
  myQuestionCategories,
  onModerationQuestionCategories,
  onModerationQuestionDefault,
  timeCategories,
  timeSelectDefault,
} from "../../shared/constants";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  questions$: Observable<Question[]>
  userInfo = this.authService.getUserInfo()
  categoriesList: string[] = categories
  checkCategoriesList = Object.assign({}, ...this.categoriesList.map(n => ({[n]: false})))
  sortingDesc: boolean = false;

  private request$ = new BehaviorSubject(true);

  isFiltersShow: boolean = false;
  timeSelect: number
  timeCategories : { period: string, days: number }[]= timeCategories

  decisionSelect: string;
  decisionCategories = decisionCategories

  onModerationQuestionSelect: string
  onModerationQuestionCategories = onModerationQuestionCategories

  myQuestionSelect: string
  myQuestionCategories = myQuestionCategories

  checkboxCategories: FormGroup;
  viewType: string;
  public isAdmin: boolean = undefined

  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ) {
    this.viewType = JSON.parse(localStorage.getItem("viewType")) || 'grid';

    this.route.params.subscribe((param) => {
      this.request$.next(true)
    })

    this.questions$ = this.request$.pipe(
      switchMapTo(this.questionService.getAllQuestions()));
  }

  ngOnInit() {
    this.isAdmin = this.authService.getUserInfo().isAdmin
    this.timeSelect = timeSelectDefault.days
    this.decisionSelect = decisionSelectDefault
    this.onModerationQuestionSelect = onModerationQuestionDefault
    this.myQuestionSelect = isMyQuestion
    this.checkboxCategories = this.formBuilder.group({
      ...this.checkCategoriesList
    });
  }

  addCategoryToFilter(category: string) :void {
    this.checkboxCategories.controls[category].setValue(!this.checkboxCategories.controls[category].value);
  }

  onChanged() : void {
    this.request$.next(true)
  }

  filtersMenu(): void {
    this.isFiltersShow = !this.isFiltersShow
  }

  setModeView(mode: string): void{
    this.viewType = mode;
    localStorage.setItem("viewType", `"${mode}"`);
  }

}
