import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import firebase from "firebase/app";
import {UserInfo} from "../interfaces";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  private user: User

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

  authState(): Observable<firebase.User | null> {
    return this.authService.authState.pipe(
      map((user) => {
          this.user = user
          return user
        }
      )
    )
  }

  checkAuth(): Observable<firebase.User | null> {
    if (this.user) {
      return of(this.user)
    } else {
      return this.authState().pipe(
        switchMap((res) => {
            return this.http.get(`${environment.fbDbQuestUrl}/admins.json`).pipe(
              map((admins: any) => {
                if (this.user) {
                  this.user.isAdmin = admins.includes(this.user?.email);
                }
                return res;
              })
            );
          }
        )
      )
    }
  }
}
