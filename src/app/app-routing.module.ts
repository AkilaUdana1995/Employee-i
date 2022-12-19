import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEmpComponent } from './post-emp/post-emp.component';


const routes: Routes = [
  { path: 'employee', component: PostEmpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
