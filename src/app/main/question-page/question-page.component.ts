import {Component, OnInit} from '@angular/core';
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Comments} from "../../shared/interfaces";
import {SharedAuthService} from "../../shared/services/shared-auth.service";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  question$: Observable<any>
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  formAddComment: FormGroup
  isSubmitted = false



  constructor(private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              public sanitaizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private authService: SharedAuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formAddComment = this.formBuilder.group({
      text: new FormControl(null, Validators.required),
    })

    this.question$ = this.route.params
      .pipe(switchMap(params => {
        return this.questionService.getQuestionById(params['id'])
      }))
  }


  addComment() {
    let question: any = this.questionService.getQuestionInfo()
    let newComment: Comments = {
      date: new Date().getTime(),
      isDecision: false,
      user: this.authService.getUserInfo().email,
      text: this.formAddComment.controls['text'].value
    }
    this.formAddComment.reset()
    question.comments ? question.comments.push(newComment) : question.comments = [newComment]

    this.route.params
      .pipe(switchMap(params => {
        return this.questionService.updateQuestion(question, params['id'])
      })).subscribe(t => {
      this.router.navigate(['/question',question.name])
    })
  }

  isApproved(){
    let question: any = this.questionService.getQuestionInfo()
    question.isApproved=true;

    this.route.params
      .pipe(switchMap(params => {
        return this.questionService.updateQuestion(question, params['id'])
      })).subscribe(t => {
    })
  }

  deleteQuestion() {
    this.route.params
      .pipe(switchMap(params => {
        return this.questionService.removeQuestion(params['id'])
      })).subscribe(t => {this.router.navigate(['/dashboard']);},
      error =>  console.log(error))
  }

  addDecision(idComment:  number) {
    let question: any = this.questionService.getQuestionInfo()
    question.comments[idComment].isDecision = true
    this.route.params
      .pipe(switchMap(params => {
        return this.questionService.updateQuestion(question, params['id'])
      })).subscribe(t => {
    })

  }
}
