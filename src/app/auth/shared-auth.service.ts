import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {user} from "./interfaces";
import firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  constructor(private http: HttpClient) {
  }

  signUp(user: user) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, user)
  }

  signInWithEmail(email:string, password:string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  signOut() {
    return firebase.auth().signOut()
  }

  isAuthentificated(): boolean {
    const user = firebase.auth().currentUser
    return !!user
  }
}
