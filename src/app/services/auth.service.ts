import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

    // Sign up with email/password
    // SignUp(email: string, password: string, myName: string,myAccountType:string) {
    //   this.clearAuthMessage();
    //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    //     .then((result: any) => {
    //       /* Call the SendVerificaitonMail() function when new user sign 
    //       up and returns promise */
    //       this.SendVerificationMail();
    //       //add new student to the system
    //       var newClient: Client = {
    //         clientId: result.user.uid,
    //         email: result.user.email,
    //         name: myName ? myName : result.user.displayName,
    //         address: "",
    //         mobile: "",
    //         profileType:myAccountType?myAccountType:result.user.profileType,
    //       };
    //       this.dataservice.addNewClient(newClient);
    //       this.verifyEmailLock = true;
    //       this.analytics.logEvent("sign_up", {
    //         method: "Email:" + email
    //       });
    //     }).catch((error) => {
    //       this.authMessage = error.message;
    //       this.processSucceed = false;
    //       this.verifyEmailLock = false;
    //     })
    // }
  
}
