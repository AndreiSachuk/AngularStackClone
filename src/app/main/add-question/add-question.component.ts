import {Component,  OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as myGlobal from "../../shared/constants";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {Question} from "../../shared/interfaces";
import {Router} from "@angular/router";
import {ErrService} from "../../shared/services/err.service";


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})

export class AddQuestionComponent implements OnInit {

  formAddQuestion: FormGroup
  isSubmitted = false
  categoryList : { category: string, isChecked: boolean }[] = []
  checkedCategories: string[] = []


  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService,
              private router: Router,
              private errService: ErrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formAddQuestion = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      tags: this.formBuilder.array([], Validators.required)
    })

    myGlobal.categories.forEach( category => this.categoryList.push({category: category, isChecked: false}))

  }

  onCheckboxChange(e: Event) : void{
    const checkedCategories: FormArray = this.formAddQuestion.get('tags') as FormArray

    if ((e.target as HTMLInputElement).checked) {
      checkedCategories.push(new FormControl((e.target as HTMLInputElement).value))
    } else {
      const index = checkedCategories.controls.findIndex(x => x.value === ((e.target as HTMLInputElement).value))
      checkedCategories.removeAt(index)
    }
    this.checkedCategories=checkedCategories.value
  }

  submit() : void {

    if (this.formAddQuestion.invalid){
      return
    }
    if (!this.checkedCategories.length){
      this.errService.openDialog('Select at least 1 category')
      return
    }

    const question: Question = {
      title: this.formAddQuestion.value.title,
      text: this.formAddQuestion.value.text,
      tags: this.checkedCategories,
      date: new Date().getTime(),
      user: this.authService.getUserInfo().email,
      isApproved: false,
      isResolved: false,
      comments: []
    }

    this.questionService.createQuestion(question)
      .subscribe(res => {
        this.router.navigate(['/dashboard'])
      },
        err =>{
          this.errService.openDialog(err.error.error)
        })
  }


}
