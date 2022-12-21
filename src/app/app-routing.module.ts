import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { PostEmpComponent } from './post-emp/post-emp.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';


const routes: Routes = [
  { path: 'employee', component: PostEmpComponent },
  { path: 'viewEmployees', component: ViewEmployeesComponent },
  { path: 'editEmployees', component: EditEmpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
