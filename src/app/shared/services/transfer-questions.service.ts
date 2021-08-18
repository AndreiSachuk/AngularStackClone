import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import { FbResponse, Question} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransferQuestionsService {

  public currentQuestion: FbResponse

  constructor(private http: HttpClient,
  ) {
  }

  createQuestion(question: Question) {
    return this.http.post(`${environment.fbDbQuestUrl}/question.json`, question)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...question,
            id: res.name,
            date: question.date
          }
        })
      )
  }

  getAllQuestions() {
    return this.http.get(`${environment.fbDbQuestUrl}/question.json`)
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      .pipe(map((res:any) => {
        return Object.keys(res)
          .map((key: any) =>({
            ...res[key],
            id: key,
            date: res[key].date
          }))
      }))
  }

  getQuestionById(id:string) {
    return this.http.get(`${environment.fbDbQuestUrl}/question/${id}.json`)
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      .pipe(map((res:any) => {
        this.currentQuestion = res
        return {
            ...res,
            id,
          }
      }))
  }

  getQuestionInfo(){
    return this.currentQuestion
  }

  removeQuestion(id:string){
    return this.http.delete(`${environment.fbDbQuestUrl}/question/${id}.json`)
  }

  updateQuestion(question: Question, id: string){
    return this.http.put(`${environment.fbDbQuestUrl}/question/${id}.json`, question)
  }


}
