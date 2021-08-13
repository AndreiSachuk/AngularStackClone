import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedAuthService} from "../shared-auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {user} from "../interfaces";

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


  constructor(private auth: SharedAuthService,
              private router: Router,
              private dialog: MatDialog,) {
  }

  openDialog(): void{
    this.dialog.open(DialogComponent);
  }


  ngOnInit(): void {
  }

  registration():void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true


    let user:user = {
      email: this.form.value.email,
      password: this.form.value.password
    }


    this.auth.signUp(user.email, user.password)
      .then(res => {
        this.form.reset()
        this.router.navigate(['/sign-in'])
      })
      .catch(err => {
        this.auth.errMsg = err.message
        this.openDialog()
        this.form.reset()
      }
    )

  }
}

