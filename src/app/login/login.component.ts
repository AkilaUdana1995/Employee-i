import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from '../login/custom-validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  public loginState: string = "";
  //accountTypes: any = ['Personal', 'Car Sale'];   //these are accessed in when selecting a profile


  //sign Up form
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    CustomValidators.mustMatch('password', 'confirmPassword') // insert here
  );



  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    },
  );
  value: string = "";
  success = '';


  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }


  // sign-up(email: string, password: string, username: string)
  signin(email: string, password: string, username: string) {
    this.authService.SignUp(email, password, username).then(e => {
      this.authService.isUserAvailable().then(res => {
        if (res) {
          this.dialogRef.close();
        }
      });
    })
  }


  //login
  login(username: string, password: string) {
    this.authService.SignIn(username, password).then(e => {
      this.authService.isUserAvailable().then(res => {
        if (res) {
          this.dialogRef.close();
          console.log("weda kara!!!");

        }
      });
    })
  }
  //method to swap between sign Up and login
  changeInterface(state: string) {
    this.loginState = state;
    console.log(state + "current login state");

    this.authService.clearAuthMessage();
    console.log("awoooooooooooo");

  }


}
