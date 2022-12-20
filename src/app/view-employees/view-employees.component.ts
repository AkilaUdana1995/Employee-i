import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseManagerService } from './../database-manager.service';
import { Employees } from './../Models/employee';
import { PostEmpComponent } from './../post-emp/post-emp.component';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit {

  public employeeData: Array<Employees> = new Array<Employees>();
  constructor(private databaseManager: DatabaseManagerService,
    private dialog: MatDialog) {
    this.getAllEmployees()



  }

  ngOnInit(): void {
  }


  test() {
    this.databaseManager.getSingleEmployeeData('Y3StehfM5E9U5MKwcPXf');
  }

  getAllEmployees() {
    this.databaseManager.getEmployees().then((res: Array<Employees>) => {
      res.forEach(element => {
        this.employeeData.push(element);
        console.log(this.employeeData + "outcome result");

      });
    })
  }

  openDialog(service: any) {
    this.dialog.open(PostEmpComponent);
    let dialogRef = this.dialog.open(PostEmpComponent, { data: { service } });
  }

}
