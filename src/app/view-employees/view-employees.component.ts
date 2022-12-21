import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TIMEOUT } from 'dns';
import { concatMap, startWith, Subject } from 'rxjs';
import { DatabaseManagerService } from './../database-manager.service';
import { Employees } from './../Models/employee';
import { PostEmpComponent } from './../post-emp/post-emp.component';
import { EditEmpComponent } from './../edit-emp/edit-emp.component';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit {

  public employeeData: Array<Employees> = new Array<Employees>();
  constructor(private databaseManager: DatabaseManagerService,
    private dialog: MatDialog) {
    this.getAllEmployees();
    // this.closeDialog();



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

  //this method is for take data into "EditEmpComponent"
  openDialog(service: Employees) {
    // this.dialog.open(PostEmpComponent);
    let dialogRef = this.dialog.open(EditEmpComponent, { data: { service } })

  }

  //this method will bring an id for "EditEMPComponent"
  openDialog2(id: any, service: Employees) {
    // this.dialog.open(PostEmpComponent);
    let dialogRef = this.dialog.open(EditEmpComponent, { data: { id, service } })

  }


  //   private readonly postAction$ = new Subject();

  // posts$ = this.postAction$.pipe(
  //   startWith(''),
  //   concatMap(()=> {
  //     return this.databaseManager.getEmployees(); // this will be your http get request
  //   }),
  // )

}
