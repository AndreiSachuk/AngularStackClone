import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

const material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
