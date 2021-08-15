import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatDialogModule} from "@angular/material/dialog";

const material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
