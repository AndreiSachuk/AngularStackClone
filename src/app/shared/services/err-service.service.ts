import {Injectable} from '@angular/core';
import {DialogComponent} from "../components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ErrServiceService {

  public errMsg: string = ''

  constructor(private dialog: MatDialog,) {
  }

  openDialog() {
    if (this.errMsg !== "The popup has been closed by the user before finalizing the operation.") {
      this.dialog.open(DialogComponent);
    }
    return
  }
}
