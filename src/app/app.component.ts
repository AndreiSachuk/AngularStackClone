import {Component, OnDestroy, OnInit} from '@angular/core';
import { ThemeService} from "./shared/services/theme.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {appThemesArray} from "./shared/constants";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  activeClass:string = JSON.parse(localStorage.getItem("Current theme")) || appThemesArray[0];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private themeService: ThemeService) {

  }

  ngOnInit(): void {
    this.themeService.getThemeArr().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log('1c')
      this.activeClass = data
      localStorage.setItem("Current theme", JSON.stringify(this.activeClass));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
