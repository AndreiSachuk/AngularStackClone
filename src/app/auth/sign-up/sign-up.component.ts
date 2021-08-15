import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {Router} from "@angular/router";
import {ErrServiceService} from "../../shared/services/err-service.service";
import {faCodeBranch} from "@fortawesome/free-solid-svg-icons";

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

  isSubmitted: boolean = false;
  gitIcon = faCodeBranch;


  constructor(private authService: SharedAuthService,
              private router: Router,
              private errService: ErrServiceService,
              private ngZone: NgZone,) {
  }

  ngOnInit(): void {
  }

  registration():void {
    if (this.form.invalid) {
      return
    }
    this.isSubmitted = true

    this.authService.signUp(this.form.value.email, this.form.value.password)
      .then(res => {
        this.form.reset()
        this.router.navigate(['/sign-in'])
        this.isSubmitted = false

      })
      .catch(err => {
        this.errService.errMsg = err.message
        this.errService.openDialog()
        this.isSubmitted = false

      }
    )

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

