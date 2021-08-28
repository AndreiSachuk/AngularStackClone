import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {Router} from "@angular/router";
import {ErrService} from "../../shared/services/err.service";
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
              private errService: ErrService,
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
        this.authService.getAdmins().subscribe()
        this.form.reset()
        this.router.navigate(['/sign-in'])
        this.isSubmitted = false
      })
      .catch(err => {
        this.errService.openDialog(err.message)
        this.isSubmitted = false

      }
    )

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

