import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PostEmpComponent } from './post-emp/post-emp.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'employee', component: PostEmpComponent,canActivate: [AuthGuard] },
  { path: 'viewEmployees', component: ViewEmployeesComponent,canActivate: [AuthGuard] },
  { path: 'editEmployees', component: EditEmpComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
