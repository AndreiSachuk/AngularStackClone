import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {switchMap} from "rxjs/operators";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "../../shared/interfaces";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {ErrService} from "../../shared/services/err.service";
import * as myGlobal from "../../shared/constants";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  formEditQuestion: FormGroup
  question: Question
  checkedCategories: string[] = []
  categoryList: { category: string, isChecked: boolean }[] = []
  isSubmitted = false

  constructor(private route: ActivatedRoute,
              private questionService: TransferQuestionsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: SharedAuthService,
              private errService: ErrService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(params => {
        return this.questionService.getQuestionById(params['id'])
      })).subscribe(question => {
      this.question = question
      for (let category of myGlobal.categories) {
          if (this.question.tags.includes(category)) {
            this.categoryList.push({category: category, isChecked: true})
            this.checkedCategories.push( category)
          } else {
            this.categoryList.push({category: category, isChecked: false})
          }
      }
      console.log(this.categoryList)
      this.formEditQuestion = this.formBuilder.group({
        title: new FormControl(this.question.title, Validators.required),
        text: new FormControl(this.question.text, Validators.required),
        tags: this.formBuilder.array([], )
      })
    })


  }

  onCheckboxChange(e: any) {
    const checkedCategories: FormArray = this.formEditQuestion.get('tags') as FormArray;

    if (e.target.checked) {
      checkedCategories.push(new FormControl(e.target.value));
    } else {
      const index = checkedCategories.controls.findIndex(x => x.value === e.target.value);
      checkedCategories.removeAt(index);
    }
    this.checkedCategories = (checkedCategories.value)
  }

  submit() {

    if (this.formEditQuestion.invalid) {
      return
    }
    if (!this.checkedCategories.length) {
      this.errService.openDialog('Select at least 1 category')
      return
    }

    const question: Question = {
      title: this.formEditQuestion.value.title,
      text: this.formEditQuestion.value.text,
      tags: this.checkedCategories,
      date: this.question.date,
      user: this.authService.getUserInfo().email,
      isApproved: false,
      comments: this.question.comments
    }

    this.route.params
      .pipe(switchMap(params => {
        return this.questionService.updateQuestion(question, params['id'])
      })).subscribe(t => {
      this.router.navigate(['/'])
    })
  }

}
