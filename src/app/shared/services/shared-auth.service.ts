import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import firebase from "firebase/app";
import {UserInfo} from "../interfaces";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  private user: UserInfo
  private boolAdmin: boolean

  constructor(private authService: AngularFireAuth,
              private http: HttpClient) {
  }

  signUp(email: string, password: string): Promise<object> {
    return this.authService.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmail(email: string, password: string): Promise<object> {
    return this.authService.signInWithEmailAndPassword(email, password)
  }

  signInWithGoogle(): Promise<object> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.authService.signInWithPopup(provider)
  }

  signInWithFacebook(): Promise<object> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.authService.signInWithPopup(provider)
  }

  signInWithGithub(): Promise<object> {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.authService.signInWithPopup(provider)
  }

  signOut(): Promise<void> {
    this.user = undefined
    return this.authService.signOut()
  }

  getUserInfo(): UserInfo {
    return this.user
  }

  isAdmin(): boolean {
    return this.boolAdmin
  }

  getAdmins(): any {
     return this.http.get(`${environment.fbDbQuestUrl}/admins.json`)
      .subscribe(
      (res:any) => {
        this.boolAdmin = res.includes(this.user?.email)
        console.log('getAdmins()' + this.boolAdmin)
        return res
      }
    )
  }

  checkAuth(): Observable<firebase.User | null> {
    return this.authService.authState.pipe(
      map((user) => {
        console.log('checkAuth()')
          this.user = user
          return user
        }
      ))
  }
}
