import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { CustomParm, ParmType } from './custom-parms';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    public authService: AuthService,
    public router: Router,
    private analytics: AngularFireAnalytics
  ) {


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.loginState === 0) {
      var parm: CustomParm = {
        type: ParmType.login,
      }
      this.noAuthorized();
      setTimeout(() => {
        this.router.navigate(['/login'], { state: { parm } })
      }, 10);

    }
    return true;
  }

  noAuthorized() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
