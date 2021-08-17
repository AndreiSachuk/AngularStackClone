import {Injectable} from '@angular/core';
import {DialogComponent} from "../components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ErrService {

  public errorMessage: string = ''

  constructor(private dialog: MatDialog,) {
  }

  openDialog(errorMessage:string) {
    if (errorMessage !== "The popup has been closed by the user before finalizing the operation.") {
      this.errorMessage = errorMessage;
      this.dialog.open(DialogComponent);
    }
  }
}
