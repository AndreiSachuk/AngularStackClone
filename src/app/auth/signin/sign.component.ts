import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faCodeBranch} from "@fortawesome/free-solid-svg-icons";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {Router} from "@angular/router";
import {ErrService} from "../../shared/services/err.service";

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
              private errService: ErrService,
              private ngZone: NgZone,
  ) {
  }

  signIn(): void {
    if (this.form.invalid) {
      return
    }
    this.isSubmitted = true

    this.authService.signInWithEmail(this.form.value.email, this.form.value.password)
      .then(res => {
        this.authService.getAdmins().subscribe()
        this.form.reset()
        this.isSubmitted = false
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        this.form.controls['password'].reset()
          this.isSubmitted = false
          this.errService.openDialog(err.message)
        }
      )
  }

  ngOnInit(): void {

  }

  signInGoogle() {
    this.authService.signInWithGoogle()
      .then(r => {
          this.authService.getAdmins().subscribe()
          this.ngZone.run(()=> this.router.navigate(['/dashboard']))
        }
      )
      .catch(err => {
        this.errService.openDialog(err.message)
      })
  }

  signInFacebook() {
    this.authService.signInWithFacebook()
      .then(r => this.ngZone.run(()=> {
        this.authService.getAdmins().subscribe()
        this.router.navigate(['/dashboard'])}
      ))
      .catch(err => {
        this.errService.openDialog(err.message)
      })
  }

  signInGithub() {
    this.authService.signInWithGithub()
      .then(r => this.ngZone.run(()=> {
        this.authService.getAdmins().subscribe()
        this.router.navigate(['/dashboard'])
      }))
      .catch(err => {
        this.errService.openDialog(err.message)
      })
  }
}
