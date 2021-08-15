import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faCodeBranch} from "@fortawesome/free-solid-svg-icons";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {Router} from "@angular/router";
import {ErrServiceService} from "../../shared/services/err-service.service";

@Component({
  selector: 'app-signin',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  gitIcon = faCodeBranch;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })


  isSubmitted: boolean = false;

  constructor(private authService: SharedAuthService,
              private router: Router,
              private errService: ErrServiceService,
              private ngZone: NgZone,
  ) {
  }

  signIn(): void {

    this.isSubmitted = true

    this.authService.signInWithEmail(this.form.value.email, this.form.value.password)
      .then(res => {
        this.form.reset()
        this.isSubmitted = false
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {

          this.isSubmitted = false
          this.errService.errMsg = err.message
          this.errService.openDialog()
        }
      )
  }

  ngOnInit(): void {

  }

  signInGoogle() {
    this.authService.signInWithGoogle()
      .then(r => {
        this.ngZone.run(()=> this.router.navigate(['/dashboard']))
        }
      )
      .catch(err => {
        this.errService.errMsg = err.message
        this.errService.openDialog()
      })
  }

  signInFacebook() {
    this.authService.signInWithFacebook()
      .then(r => this.ngZone.run(()=> this.router.navigate(['/dashboard'])))
      .catch(err => {
        this.errService.errMsg = err.message
        this.errService.openDialog()
      })
  }

  signInGithub() {
    this.authService.signInWithGithub()
      .then(r => this.ngZone.run(()=> this.router.navigate(['/dashboard'])))
      .catch(err => {
        this.errService.errMsg = err.message
        this.errService.openDialog()
      })
  }
}
