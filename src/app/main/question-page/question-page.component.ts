import {Component, OnInit} from '@angular/core';
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Comments, Question} from "../../shared/interfaces";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {ErrService} from "../../shared/services/err.service";


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  question$: Observable<Question>

  private request$ = new BehaviorSubject<string>('' );

  formAddComment: FormGroup
  isSubmitted = false
  public currentEmail: string
  question: Question;
  public isAdmin: boolean;

  constructor(private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              public sanitaizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private authService: SharedAuthService,
              private router: Router,
              private errService: ErrService) {
    this.route.params.subscribe((param) => {
      this.request$.next(param['id'])
    })
    this.question$ = this.request$.pipe(
      switchMap(questionId => this.questionService.getQuestionById(questionId)),
      map((question: Question) => {
        this.question = question
        if (!this.question.hasOwnProperty('comments'))
          this.question.comments = []
        return question
      }));
    this.currentEmail = this.authService.getUserInfo().email

  }


  updateData() : void {
    this.request$.next(this.question.id)
  }


  ngOnInit(): void {
    this.formAddComment = this.formBuilder.group({
      text: new FormControl(null, Validators.required),
    })
    this.isAdmin = this.authService.getUserInfo().isAdmin
  }

  addComment(): void {
    let newComment: Comments = {
      date: new Date().getTime(),
      isDecision: false,
      user: this.currentEmail,
      text: this.formAddComment.controls['text'].value
    }
    this.question.comments.push(newComment)
    this.questionService.patchQuestion({comments: this.question.comments}, this.question.id)
      .subscribe(
        t => {
          this.formAddComment.reset()
          this.updateData()
        },
        error => this.errService.openDialog(error)
      )
  }

  isApproved() : void{
    this.questionService.patchQuestion({['isApproved']: true}, this.question.id)
      .subscribe(
        t => {
          this.updateData()
        },
        error => this.errService.openDialog(error.error.error)
      )
  }

  deleteQuestion() : void {
    this.questionService.removeQuestion(this.question.id)
      .subscribe(t => {
          this.router.navigate(['/dashboard']);
        },
        error => this.errService.openDialog(error.error.error))
  }

  addDecision(idComment: number): void {
    this.questionService.patchCommentsDecision({[`isDecision`]: true}, this.question.id, idComment)
      .subscribe(
        t => this.updateData(),
        error => this.errService.openDialog(error.error.error)
      )
  }

}
