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
  public loginState: string = "Initial";
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


  // registerForm = new FormGroup(
  //   {
  //     name: new FormControl(
  //       '',
  //       [Validators.required]
  //     ),
  //     address: new FormControl(
  //       '',
  //       [Validators.required,]
  //     ),
  //     NIC: new FormControl(
  //       '',
  //       [Validators.required,
  //       Validators.pattern("^[0-9]*$"),
  //       Validators.minLength(9),
  //       Validators.maxLength(12),
  //       ]
  //     ),

  //     EMP_code: new FormControl(
  //       '',
  //       [Validators.required,
  //       Validators.pattern("^[0-9]*$")]
  //     ),

  //     gender: new FormControl(
  //       '',
  //       [Validators.required,]
  //     ),

  //     department: new FormControl(
  //       '',
  //       [Validators.required,]
  //     ),
  //   }
  // );




  // loginForm = new FormGroup(
  //   {
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(8)
  //     ]),
  //   },
  // );
  value: string = "";
  success = '';


  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }
  // signin(email: string, password: string, username: string,accountType:string) {
  // signin(email: string, password: string, username: string) {
  //   this.authService.SignUp(email, password, username,"Personal").then(e => {
  //     this.authService.isUserAvailable().then(res => {
  //       if (res) {
  //         this.dialogRef.close();
  //       }
  //     });
  //   })
  // }


}
