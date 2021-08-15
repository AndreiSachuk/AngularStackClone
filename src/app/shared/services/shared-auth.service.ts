import {Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import firebase from "firebase/app";
import {UserInfo} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  private user: UserInfo

  constructor(private authService: AngularFireAuth,) {
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
    return this.authService.signOut()
  }

  getUserInfo(): UserInfo {
    return this.user
  }

  checkAuth(): Observable<any> {
    return this.authService.authState.pipe(
      map((user)=> {
        this.user = user
        return user
      }
    ))
  }
}
