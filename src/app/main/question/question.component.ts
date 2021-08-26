import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../shared/interfaces";
import {DomSanitizer} from "@angular/platform-browser";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ErrService} from "../../shared/services/err.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() view: string;
  @Output() onChanged = new EventEmitter();
  @Output() categoryChanged = new EventEmitter<string>();

  constructor(public sanitaizer: DomSanitizer,
              private questionService: TransferQuestionsService,
              private errService: ErrService) {
  }

  ngOnInit(): void {
  }

  addCategoryToFilter(category: string){
    this.categoryChanged.emit(category)
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


