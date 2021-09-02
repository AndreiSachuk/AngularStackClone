import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import firebase from "firebase/app";
import {UserInfo} from "../interfaces";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  private user: User

  constructor(private authService: AngularFireAuth,
              private http: HttpClient) {
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return this.authService.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmail(email: string, password: string): Promise<UserCredential> {
    return this.authService.signInWithEmailAndPassword(email, password)
  }

  signInWithGoogle(): Promise<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.authService.signInWithPopup(provider)
  }

  signInWithFacebook(): Promise<UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.authService.signInWithPopup(provider)
  }

  signInWithGithub(): Promise<UserCredential> {
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
      tap((user) => {
          this.user = user
          return user
        }
      )
    )
  }

  getAdmins(user: User|null): Observable<firebase.User | null> {
    return this.http.get<string[]>(`${environment.fbDbQuestUrl}/admins.json`).pipe(
      map((admins: string[]) => {
        this.user.isAdmin = admins.includes(this.user.email);
        return user;
      })
    )
  }


  checkAuth(): Observable<firebase.User | null> {
    if (this.user) {
      return of(this.user)
    }
    return this.authState().pipe(
      switchMap((user) => {
        if (!user) {
          return of(this.user)
        }
        return this.getAdmins(user)
      })
    )
  }

}
