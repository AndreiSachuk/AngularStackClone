import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppThemes} from "../constants";



@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: AppThemes ;
  currentThemeSubject = new Subject<string>();

  constructor() {


  }

  toggleTheme(): void {

    if (this.currentTheme === AppThemes.light) {
      this.currentTheme = AppThemes.dark;
      this.currentThemeSubject.next(AppThemes.dark);
    } else {
      this.currentTheme = AppThemes.light;
      this.currentThemeSubject.next(AppThemes.light);
    }

  }

  getTheme(): Observable<string> {
    return this.currentThemeSubject.asObservable();
  }
}
