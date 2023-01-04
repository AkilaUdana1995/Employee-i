import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostEmpComponent } from './post-emp/post-emp.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'employee', component: PostEmpComponent, canActivate: [AuthGuard] },
  { path: 'viewEmployees', component: ViewEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'editEmployees', component: EditEmpComponent, canActivate: [AuthGuard] },
  //Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
