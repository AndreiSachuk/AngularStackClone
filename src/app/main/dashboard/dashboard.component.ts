import {Component, Inject, NgZone, OnInit, Renderer2} from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {BehaviorSubject, Observable} from 'rxjs';
import {Question} from "../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {map, switchMapTo} from "rxjs/operators";
import {categories} from "../../shared/constants";
import {DOCUMENT} from "@angular/common";

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
  filters: boolean = false;
  settings: boolean = false;
  timeSelectDefault: string = 'All time'
  timeSelect: string
  timeCategories: string[] = ['Day', 'Week', 'Month', 'All time'];
  decisionSelectDefault: string = 'Does not matter';
  decisionSelect: string;
  decisionCategories: string[] = ['Yes', 'No', 'Does not matter'];

  checkboxCategories: FormGroup;
  view: string = 'grid';
  theme = false

  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
  ) {
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
    this.decisionSelect = this.decisionSelectDefault
    this.checkboxCategories = this.formBuilder.group({
      ...this.checkCategoriesList
    });
  }

  addCategoryToFilter(category:string){
    this.checkboxCategories.controls[category].setValue(true);
  }

  onChanged() {
    this.request$.next(true)
  }

  filtersMenu() {
    this.filters = !this.filters
  }

  settingsMenu() {
    this.settings = !this.settings
  }


  changeTheme() {
    this.theme = !this.theme
    if (this.theme) {
      this.renderer.addClass(this.document.body, 'darkMode');
    } else {
      this.renderer.removeClass(this.document.body, 'darkMode');
    }
  }
}
