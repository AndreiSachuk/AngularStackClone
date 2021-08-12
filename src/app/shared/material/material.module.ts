import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatDialogModule} from "@angular/material/dialog";

const material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatSliderModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatFormFieldModule,
  MatDialogModule
]


@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
