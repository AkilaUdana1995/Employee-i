import { Injectable } from '@angular/core';
import { Client } from '../Models/clients';
import { Auth } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { DatabaseManagerService } from '../database-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null; // Save logged in user data
  processSucceed: boolean = true;
  verifyEmailLock: boolean = false;
  authMessage: string = "";

  constructor(
    private databaseManager: DatabaseManagerService,
    public afAuth: AngularFireAuth,
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
}
