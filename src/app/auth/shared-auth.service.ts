import {Injectable} from '@angular/core';
import firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  private user: any
  public errMsg:string = ''

  constructor(private auth: AngularFireAuth,) {
  }

  signUp(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  signInWithEmail(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  signInWithGoogle(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  signInWithFacebook(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  signInWithGithub(): Promise<any> {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  signOut(): Promise<any> {
    return firebase.auth().signOut()
  }

  getUserInfo(): object {
    const user = firebase.auth().currentUser
    let userInfo!: object;

    if (user != null) {
      userInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      }
    }

    return userInfo
  }



  checkAuth(): Observable<any> {
    return this.auth.authState.pipe(
      map((user)=> {
        this.user = user
        return user
      }
    ))
  }
}
