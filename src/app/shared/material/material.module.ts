import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";

const material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatRadioModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
