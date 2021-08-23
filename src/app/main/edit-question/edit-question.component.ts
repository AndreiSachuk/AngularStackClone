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
  checkedCategoriesForm: FormArray
  canAddCheckedCategories:boolean = true
  id: string;

  constructor(private route: ActivatedRoute,
              private questionService: TransferQuestionsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: SharedAuthService,
              private errService: ErrService,){
  }


  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.questionService.getQuestionById(params['id'])
      )
    ).subscribe(res => {
      this.question = res
      this.id = res.id
      for (let category of myGlobal.categories) {
        if (this.question.tags.includes(category)) {
          this.categoryList.push({category: category, isChecked: true})
          this.checkedCategories.push(category)
        } else {
          this.categoryList.push({category: category, isChecked: false})
        }
      }
      this.formEditQuestion = this.formBuilder.group({
        title: new FormControl(this.question.title, Validators.required),
        text: new FormControl(this.question.text, Validators.required),
        tags: this.formBuilder.array([],Validators.required)
      })
      this.checkedCategoriesForm = this.formEditQuestion.get('tags') as FormArray
      for (let el of this.checkedCategories)
        this.checkedCategoriesForm.push(new FormControl(el));
    })
  }

  returnToQuestion(): void {
    this.router.navigate([`/question/${this.id}`])
  }

  onCheckboxChange( e: Event) {
    if ((e.target as HTMLInputElement).checked ) {
      this.checkedCategoriesForm.push(new FormControl((e.target as HTMLInputElement).value))
    } else {
      const index = this.checkedCategoriesForm.controls.findIndex(x => x.value === (e.target as HTMLInputElement).value)
      this.checkedCategoriesForm.removeAt(index)
    }
  }

  submit(): void {
    if (this.formEditQuestion.invalid) {
      return
    }

    const question: Question = {
      title: this.formEditQuestion.value.title,
      text: this.formEditQuestion.value.text,
      tags: this.checkedCategoriesForm.value,
      date: this.question.date,
      user: this.question.user,
      isApproved: this.question.isApproved,
      comments: this.question.comments
    }

    this.questionService.updateQuestion(question, this.id)
      .subscribe(t => {
          this.returnToQuestion()
      },
        error => this.errService.openDialog(error))
  }

}
