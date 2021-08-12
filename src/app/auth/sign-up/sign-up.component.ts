import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedAuthService} from "../shared-auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/components/dialog/dialog.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  submitted: boolean = false;
  error: any

  constructor(private auth: SharedAuthService,
              private router: Router,
              private dialog: MatDialog) {
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent);

  }


  ngOnInit(): void {
  }

  registration() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true


    let user = {
      email: this.form.value.email,
      password: this.form.value.password

    }
    this.auth.signUp(user).subscribe(res => {
        this.form.reset()
        this.router.navigate(['/sign-in'])
      },
      err => {
        this.openDialog()
        this.error = err.error.error.message
        this.form.reset()
      }
    )

  }
}

