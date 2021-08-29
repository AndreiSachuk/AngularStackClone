import {Pipe, PipeTransform} from '@angular/core';
import {Question, UserInfo} from "../interfaces";
import {oneDayTimeStamp} from "../constants";
import {SharedAuthService} from "../services/shared-auth.service";




@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {
  user: UserInfo
  isAdmin: boolean
  constructor(private authService: SharedAuthService,
  ) {
    if (!this.user){
    this.user = this.authService.getUserInfo()
    }
  }

  transform(questions: Question[], selectCategories: {[key: string]: boolean | undefined}, date: number, decision: string, myQuestion: string, onModeration: string): Question[] {

    const selectedCategories = Object.keys(selectCategories).filter(key => selectCategories[key])

    return questions
      .filter(question => date ? question.date > new Date().getTime() - date * oneDayTimeStamp : true)
      .filter(question => decision === 'Yes' ? question.isResolved : decision === 'No'? !question.isResolved : true)
      .filter(question => selectedCategories.every(category => question.tags.includes(category)))
      .filter(question => myQuestion === 'Yes' ? question.user === this.user.email : myQuestion === 'No'? question.user !== this.user.email : true)
      .filter(question => onModeration === 'Yes' ? !question.isApproved : onModeration === 'No'? question.isApproved : true)
      .filter(question => this.authService.isAdmin() ? true : question.user === this.user.email ? true : question.isApproved)

  }
}


