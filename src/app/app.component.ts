import {Component, OnDestroy, OnInit} from '@angular/core';
import { ThemeService} from "./shared/services/theme.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AppThemes} from "./shared/constants";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  darkThemeEnabled =  JSON.parse(localStorage.getItem("darkThemeEnabled")) || false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    console.log(this.darkThemeEnabled)
    this.themeService.getTheme().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.darkThemeEnabled = data !== AppThemes.light
      localStorage.setItem("darkThemeEnabled", JSON.stringify(this.darkThemeEnabled));
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
