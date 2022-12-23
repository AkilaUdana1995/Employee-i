export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    providerId: string;
 }
 
 export enum LoginState {
    notLoggedIn, notVerified, VerfiedLogin
 }