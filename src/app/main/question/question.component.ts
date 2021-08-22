import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../shared/interfaces";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrService} from "../../shared/services/err.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() onChanged = new EventEmitter();


  constructor(private authService: SharedAuthService,
              public sanitaizer: DomSanitizer,
              private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              private router: Router,
              private errService: ErrService) {
  }

  ngOnInit(): void {
  }

  update() {
    this.onChanged.emit();
  }


  isApproved(): void {
    this.questionService.patchQuestion({['isApproved']: true}, this.question.id).subscribe(
      answer => {
        this.update();
      },
      error => this.errService.openDialog(error)
    )
  }

  deleteQuestion(): void {
    this.questionService.removeQuestion(this.question.id).subscribe(
      (t) => {
        this.update();
      },
      error => this.errService.openDialog(error)
    )
  }
}


