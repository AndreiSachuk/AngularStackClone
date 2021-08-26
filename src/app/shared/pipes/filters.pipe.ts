import {Pipe, PipeTransform} from '@angular/core';
import {Question} from "../interfaces";
import {oneDayTimeStamp} from "../constants";


@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {
  transform(questions: Question[], selectCategories: {[key: string]: boolean | undefined}, date: number, decision: string): Question[] {

    let selectedCategories: string[] = []
    for (let selectCategoriesKey in selectCategories) {
      selectCategories[selectCategoriesKey] ? selectedCategories.push(selectCategoriesKey) : selectCategories
    }

    return questions
      .filter(question => date ? question.date > new Date().getTime() - date * oneDayTimeStamp : true)
      .filter(question => decision === 'Yes' ?
                          question.isResolved : decision === 'No'?
                          !question.isResolved : true)
      .filter(question => selectedCategories.every(category => question.tags.includes(category)))
  }
}


