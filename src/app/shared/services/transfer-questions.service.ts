import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Comments, FbResponse, Question} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransferQuestionsService {

  constructor(private http: HttpClient,
  ) {
  }

  createQuestion(question: Question): Observable<Object> {
    return this.http.post(`${environment.fbDbQuestUrl}/question.json`, question)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...question,
            id: res.name,
          }
        })
      )
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get(`${environment.fbDbQuestUrl}/question.json`)
      .pipe(
        map((res: any) => {
          return Object.keys(res)
            .map((key) => (
              {
                ...res[key],
                id: key,
              }))
        }))
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${environment.fbDbQuestUrl}/question/${id}.json`)
      .pipe(map((res: Question) => {
        return {
          ...res,
          id,
        }
      }))
  }

  removeQuestion(id: string): Observable<Object> {
    return this.http.delete(`${environment.fbDbQuestUrl}/question/${id}.json`)
  }

  updateQuestion(question: Question, id: string): Observable<Object> {
    return this.http.put(`${environment.fbDbQuestUrl}/question/${id}.json`, question)
  }

  patchQuestion(updateComponent: { [key: string]: boolean | Comments[] }, id: string): Observable<Object> {
    return this.http.patch(`${environment.fbDbQuestUrl}/question/${id}.json`, updateComponent)
  }

  patchCommentsDecision(updateComponent: { [key: string]: boolean }, id: string, commentNumber: number): Observable<Object> {
    return this.http.patch(`${environment.fbDbQuestUrl}/question/${id}/comments/${commentNumber}.json`, updateComponent)
  }


}
