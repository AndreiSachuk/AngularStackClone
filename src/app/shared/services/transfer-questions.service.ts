import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, switchMap} from "rxjs/operators";
import {AllQuestions, Comments, FbResponse, Question} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransferQuestionsService {

  constructor(private http: HttpClient,
  ) {
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<FbResponse>(`${environment.fbDbQuestUrl}/question.json`, question)
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
    return this.http.get<AllQuestions>(`${environment.fbDbQuestUrl}/question.json`)
      .pipe(
        map((res: AllQuestions) => {
          return Object.keys(res)
            .map((key: string) => (
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

  removeQuestion(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.fbDbQuestUrl}/question/${id}.json`)
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${environment.fbDbQuestUrl}/question/${question.id}.json`, question)
  }

  patchQuestion(updateComponent: { [key: string]: boolean | Comments[] }, id: string): Observable<{ [key: string]: boolean | Comments[] }> {
    return this.http.patch<{ [key: string]: boolean | Comments[] }>(`${environment.fbDbQuestUrl}/question/${id}.json`, updateComponent)
  }

  patchCommentsDecision(updateComponent: { [key: string]: boolean }, id: string, commentNumber: number): Observable<{ [key: string]: boolean  | Comments[]}> {
    return this.http.patch(`${environment.fbDbQuestUrl}/question/${id}/comments/${commentNumber}.json`, updateComponent)
      .pipe(
        switchMap(res => {
          return this.patchQuestion({['isResolved']: true}, id)
        }))

  }

}

