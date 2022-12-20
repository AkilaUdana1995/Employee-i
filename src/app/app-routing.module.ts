import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEmpComponent } from './post-emp/post-emp.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';


const routes: Routes = [
  { path: 'employee', component: PostEmpComponent },
  { path: 'viewEmployees', component: ViewEmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
