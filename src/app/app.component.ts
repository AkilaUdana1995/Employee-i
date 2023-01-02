import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseManagerService } from './database-manager.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'empApp';
  isLoggedIn: boolean = false;
  /**
   *
   */
  constructor(public dialog: MatDialog, public auth: AuthService,
    public databasemanger: DatabaseManagerService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AppComponent>) {
  

  }

  // momo(){
  //   this.auth.isUserAvailable().then((res) => {
  //     if (res) {
  //       this.isLoggedIn = this.auth.loginState;
  //       console.log(this.auth.loginState+"Current login state");
        
  //     }
  //   })

  // }

  openDialog(val: string) {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (val === 'post' && result) {
        this.router.navigate(['/']);
        console.log(result + "result eka ena");

      } else if (val === 'account' && result) {
        this.router.navigate(['/myaccount']);
      }
    });
  }

}
