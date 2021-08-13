import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  constructor() {
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

  isAuthentificated(): boolean {
    const user = firebase.auth().currentUser
    return !!user
  }
}
