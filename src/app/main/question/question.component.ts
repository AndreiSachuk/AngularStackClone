import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../shared/interfaces";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {TransferQuestionsService} from "../../shared/services/transfer-questions.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;


  constructor(private authService: SharedAuthService,
              public sanitaizer: DomSanitizer,
              private questionService: TransferQuestionsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  userInfo = this.authService.getUserInfo()

  ngOnInit(): void {

  }

  isApproved() {
    this.question.isApproved = true
    this.questionService.updateQuestion(this.question, this.question.id).subscribe(
      answer => console.log(answer)
    )
  }

  reloadComponent(url: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([url]);
  }

  deleteQuestion() {
    this.questionService.removeQuestion(this.question.id).subscribe(
      (t)=> {
        this.reloadComponent('/dashboard')
      },
      error => console.log(error)
    )
  }
}


