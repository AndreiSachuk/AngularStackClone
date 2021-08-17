import {Component,  OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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


  constructor(private authService: SharedAuthService,
              private questionService: TransferQuestionsService,
              private route: Router,
              private errService: ErrService) {
  }

  ngOnInit(): void {
    this.formAddQuestion = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      tags: new FormControl(null),
    })
    for (let category of myGlobal.categories)
    {
      this.categoryList.push({category: category, isChecked: false})
    }
  }


  submit() {

    let checkedCategories: string[]

    checkedCategories = this.categoryList.filter(category => category.isChecked).map(category => category.category)

    if (this.formAddQuestion.invalid){
      return
    }
    if (checkedCategories.length===0){
      this.errService.openDialog('Select at least 1 category')
      return
    }


    const question: Question = {
      title: this.formAddQuestion.value.title,
      text: this.formAddQuestion.value.text,
      tags: checkedCategories,
      date: new Date().getTime(),
      user: this.authService.getUserInfo().email,
      isApproved: false,
      comments: []
    }

    this.questionService.createQuestion(question)
      .subscribe(res => {
        this.route.navigate(['/dashboard'])
      },
        err =>{
          this.errService.openDialog(err.error.error)
        })
  }
}
