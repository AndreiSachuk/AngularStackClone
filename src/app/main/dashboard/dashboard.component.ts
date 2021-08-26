import {Component,  OnInit, } from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {BehaviorSubject, Observable} from 'rxjs';
import {Question} from "../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {switchMapTo} from "rxjs/operators";
import {
  categories,
  timeCategories,
  timeSelectDefault,
  decisionSelectDefault,
  decisionCategories,
} from "../../shared/constants";


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
  checkCategoriesList = Object.assign({}, ...this.categoriesList.map(n => ({[n]: false})))
  sorting: boolean = false;

  private request$ = new BehaviorSubject(true);
  private id: string;
  isFiltersShow: boolean = false;
  timeSelect: string
  timeCategories= timeCategories

  decisionSelect: string;
  decisionCategories = decisionCategories

  checkboxCategories: FormGroup;
  view: string ;


  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,


  ) {
    this.view = JSON.parse(localStorage.getItem("view")) || 'grid';

    this.route.params.subscribe((param) => {
      this.id = param['id']
      this.request$.next(true)
    })

    this.questions$ = this.request$.pipe(
      switchMapTo(this.questionService.getAllQuestions()));
  }

  ngOnInit(): void {
    this.timeSelect = timeSelectDefault
    this.decisionSelect = decisionSelectDefault
    this.checkboxCategories = this.formBuilder.group({
      ...this.checkCategoriesList
    });
  }

  addCategoryToFilter(category:string){
    this.checkboxCategories.controls[category].setValue(!this.checkboxCategories.controls[category].value);
  }

  onChanged() {
    this.request$.next(true)
  }

  filtersMenu() {
    this.isFiltersShow = !this.isFiltersShow
  }

  getTimeFilter(timeInterval:string): number {
    switch (timeInterval) {
      case 'Day':
        return 1
      case 'Week':
        return 7
      case 'Month':
        return 30
    }
    return 0
  }

  setGridMode() {
    this.view='grid';
    localStorage.setItem("view", JSON.stringify(this.view));
  }


  setRowMode() {
    this.view='row';
    localStorage.setItem("view", JSON.stringify(this.view));
  }
}
