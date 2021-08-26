import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppThemes, ThemeService} from "./shared/services/theme.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";


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
