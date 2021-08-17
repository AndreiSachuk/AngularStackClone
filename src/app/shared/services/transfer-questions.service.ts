import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {UserInfo} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransferQuestionsService {

  constructor(private http: HttpClient,
  ) {
  }

  createQuestion(question: object) {
    return this.http.post(`${environment.fbDbQuestUrl}/question.json`, question)
      .pipe(
        map((res: UserInfo) => {
          return {
            ...question,
            id: res.name,
          }
        })
      )
  }

  getAllQuestions() {
    return this.http.get(`${environment.fbDbQuestUrl}/question.json`)
      .pipe(map(res => {
        return Object.keys(res)
      }))
  }


}
