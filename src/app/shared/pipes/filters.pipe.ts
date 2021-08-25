import {Pipe, PipeTransform} from '@angular/core';
import {Question} from "../interfaces";


@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {
  transform(questions: Question[], selectCategories: any, date: string, decision: string): any {
    let filteredList: Question[] = []

    if (Object.values(selectCategories).includes(true)) {
      let selectedCategories: Array<string> = []
      for (let key in selectCategories)
        selectCategories[key] === false ? selectCategories : selectedCategories.push(key)
      questions.filter(item => {
          if ((selectedCategories.every(elm => item.tags.includes(elm))) && (getTimeFilter(date)<item.date) &&
            (decision === 'Yes' ? item.isResolved === true : decision === 'No'? item.isResolved === false : true)) {
            filteredList.push(item);}
        })
      return filteredList;
    } else {
      questions.filter(item => {
        if ((getTimeFilter(date)<item.date) &&
          (decision === 'Yes' ? item.isResolved === true : decision === 'No'? item.isResolved === false : true)) {
          filteredList.push(item);}
      })
      return filteredList;
    }
  }
}




function getTimeFilter(timeInterval:string): number {
  switch (timeInterval) {
    case 'Day':
      return new Date().getTime() - 86400000
    case 'Week':
      return new Date().getTime() - 604800000
    case 'Month':
      return new Date().getTime() - 2678400000
  }
  return 0
}
