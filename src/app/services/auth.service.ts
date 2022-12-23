import { Injectable, NgZone } from '@angular/core';
import { Client } from '../Models/clients';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { DatabaseManagerService } from '../database-manager.service';
import { LoginState } from './user';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    //constants
    private readonly WRONG_PASSWORD = "auth/wrong-password";
    private readonly INVALID_EMAIL = "auth/invalid-email";
    private readonly NOT_REGISTERD = "auth/user-not-found";
  
    userData: any = null; // Save logged in user data
    processSucceed: boolean = true;
    verifyEmailLock: boolean = false;
    authMessage: string = "";

  constructor(
    private databaseManager: DatabaseManagerService,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private analytics: AngularFireAnalytics
  ) { }

  // Sign up with email/password
  SignUp(email: string, password: string, myName: string) {
    this.clearAuthMessage();
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {

        //add new student to the system
        var newClient: Client = {
          clientId: result.user.uid,
          email: result.user.email,
          name: myName ? myName : result.user.displayName,
          address: "",
          mobile: "",

        };
        this.databaseManager.addNewClient(newClient);
        // this.verifyEmailLock = true;

      }).catch((error) => {
        this.authMessage = error.message;
        this.processSucceed = false;
        this.verifyEmailLock = false;
      })
  }

  /**
 * Clerar authMessage
 */
  public clearAuthMessage() {
    this.authMessage = "";
    this.processSucceed = false;
  }

  //generate Error message from the service
  private generateError(code: string) {
    if (code == this.WRONG_PASSWORD) {
      this.authMessage = "Incorrect password. Please try again!"
    } else if (code == this.INVALID_EMAIL) {
      this.authMessage = "The email you entered is incorrect."
    } else if (code == this.NOT_REGISTERD) {
      this.authMessage = "You are not registered. Please Sign Up now!"
    }
  }


  //return user availability
  isUserAvailable() {
    return new Promise<boolean>(resolve => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          resolve(true);
        } else {
        }
      })
    });
  }

    // Return login state by checking user data with verification
    get loginState(): any {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user !== null && (user.emailVerified !== false || user.providerData[0].providerId === "facebook.com"))
        return LoginState.VerfiedLogin;
      else if (user !== null) {
        this.verifyEmailLock = true;
        return LoginState.notVerified;
      }
      else
        return LoginState.notLoggedIn;
    }
  
  // Sign in with email/password
  SignIn(email: string, password: string) {
    this.clearAuthMessage();
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          //alert("logged In");
          this.analytics.logEvent('login', {
            method: "Email:" + email
          });
        });
      }).catch((error) => {
        this.generateError(error.code);
        this.processSucceed = false;
      })
  }

}
