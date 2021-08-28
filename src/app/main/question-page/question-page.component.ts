import {Component, OnInit} from '@angular/core';
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {map, switchMapTo} from "rxjs/operators";
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

  private request$ = new BehaviorSubject(true);

  formAddComment: FormGroup
  isSubmitted = false
  id: string;
  public currentEmail : string
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
      this.id = param['id']
      this.request$.next(true)
    })
    this.question$ = this.request$.pipe(
      switchMapTo(this.questionService.getQuestionById(this.id)),
      map((question: Question) => {
        this.question = question
        return question
      }));
    this.currentEmail = this.authService.getUserInfo().email
  }

  updateData() {
    this.request$.next(true)
  }

  ngOnInit(): void {
    this.formAddComment = this.formBuilder.group({
      text: new FormControl(null, Validators.required),
    })
    this.isAdmin = this.authService.isAdmin()
  }

  addComment() {
    let newComment: Comments = {
      date: new Date().getTime(),
      isDecision: false,
      user: this.authService.getUserInfo().email,
      text: this.formAddComment.controls['text'].value
    }
      this.question.comments ? this.question.comments.push(newComment) : this.question.comments = [newComment]
      this.questionService.patchQuestion({['comments']: this.question.comments}, this.id)
        .subscribe(
          t => {
            this.formAddComment.reset()
            this.updateData()
          },
          error => this.errService.openDialog(error)
        )
  }

  isApproved() {
    this.questionService.patchQuestion({['isApproved']: true}, this.id)
      .subscribe(
        t => {

          this.updateData()
        },
        error => this.errService.openDialog(error.error.error)
      )
  }

  deleteQuestion() {
    this.questionService.removeQuestion(this.id)
      .subscribe(t => {
          this.router.navigate(['/dashboard']);
        },
        error => this.errService.openDialog(error.error.error))
  }

  addDecision(idComment: number) {
    this.questionService.patchCommentsDecision({[`isDecision`]: true}, this.id, idComment)
      .subscribe(t => {
          this.questionService.patchQuestion({['isResolved']: true}, this.id)
            .subscribe( t=>{
              this.updateData()
            })
        },
        error => this.errService.openDialog(error.error.error))
  }
}
