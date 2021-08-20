import {Component, OnInit} from '@angular/core';
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {find, map, switchMap, switchMapTo} from "rxjs/operators";
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

  formAddComment: FormGroup
  isSubmitted = false
  id: string;

  constructor(private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              public sanitaizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private authService: SharedAuthService,
              private router: Router,
              private errService: ErrService) {
  }

  ngOnInit(): void {
    this.formAddComment = this.formBuilder.group({
      text: new FormControl(null, Validators.required),
    })

    this.question$ = this.route.params.pipe(
      switchMap(params => this.questionService.getQuestionById(params['id'])),
      map((question: Question) => {
        this.id = question.id
        return question
      })
    )
  }

  event$ = new BehaviorSubject(true);

  updateData() {
    this.question$ = this.event$.pipe(switchMapTo(this.questionService.getQuestionById(this.id)));
    this.event$.next(true);
    this.router.navigate([`/question/${this.id}`])
  }

  addComment() {
    let question: Question
    let newComment: Comments = {
      date: new Date().getTime(),
      isDecision: false,
      user: this.authService.getUserInfo().email,
      text: this.formAddComment.controls['text'].value
    }
    this.question$.pipe(find(question => question.id === this.id)).subscribe((res: Question) => {
      question = res
      question.comments ? question.comments.push(newComment) : question.comments = [newComment]
      this.questionService.patchQuestion({['comments']: question.comments}, this.id)
        .subscribe(
          t => {
            this.formAddComment.reset(),
              this.updateData()
          },
          error => this.errService.openDialog(error)
        )
    })
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
          this.updateData()
        },
        error => this.errService.openDialog(error.error.error))
  }
}
