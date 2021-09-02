import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { appThemesArray} from "../constants";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  currentTheme: string = JSON.parse(localStorage.getItem("Current theme")) || appThemesArray[0];
  currentThemeSubjectArr = new Subject<string>();

  constructor() {

  }

  setTheme(){
    if (appThemesArray.indexOf(this.currentTheme) === (appThemesArray.length-1)){
      this.currentTheme  = appThemesArray[0]
    } else{
      this.currentTheme  = appThemesArray[appThemesArray.indexOf(this.currentTheme)+1]
    }
    this.currentThemeSubjectArr.next(this.currentTheme);
  }

  getThemeArr(): Observable<string> {
    return this.currentThemeSubjectArr.asObservable();
  }

}
