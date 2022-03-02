import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthServicefb {
    afs: AngularFirestore;

  constructor(private afAuth: AngularFireAuth) {}

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider).then((credential) => {
        this.updateUserData(credential.user)
    }).catch((err) => {
        if (err.code === 'auth/account-exists-with-different-credential') {
            
        } else if (err.code === 'auth/internal-error') {
            
        } else {
            
        }
    })
}

private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    }

    return userRef.set(data);
}

  async getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}

export interface User{
    uid: string;
        email: string;
        displayName: string;
        photoURL: string;
}