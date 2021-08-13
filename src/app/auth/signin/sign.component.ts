import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faCodeBranch} from "@fortawesome/free-solid-svg-icons";
import {SharedAuthService} from "../shared-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  git = faCodeBranch;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })


  submitted: boolean = false;

  constructor(private auth: SharedAuthService,
              private router: Router,
  ) {
  }

  signIn(): void {

    this.submitted = true

    let user = {
      email: this.form.value.email,
      password: this.form.value.password

    }
    this.auth.signInWithEmail(user.email, user.password)
      .then(res => {

        this.form.reset()
        this.submitted = false
        this.router.navigate(['/dashboard'])
        let uid = res.user.uid
        let email = res.user.email
        console.log(uid, email)

      })
      .catch(err => {
          this.form.reset()
          this.submitted = false
        }
      )
  }

  ngOnInit(): void {

  }

  signInGoogle() {
    this.auth.signInWithGoogle()
      .then(r => {
          this.router.navigate(['/dashboard'])
        }
      )
      .catch(err => console.log(err))
  }

  signInFacebook() {
    this.auth.signInWithFacebook()
      .then(r => this.router.navigate(['/dashboard']))
      .catch(err => console.log(err))
  }

  signInGithub() {
    this.auth.signInWithGithub()
      .then(r => this.router.navigate(['/dashboard']))
      .catch(err => console.log(err))
  }
}
