import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TIMEOUT } from 'dns';
import { concatMap, startWith, Subject } from 'rxjs';
import { DatabaseManagerService } from './../database-manager.service';
import { Employees } from './../Models/employee';
import { PostEmpComponent } from './../post-emp/post-emp.component';
import { EditEmpComponent } from './../edit-emp/edit-emp.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit {
  public getEmpId: string = "";

  public employeeData: Array<Employees> = new Array<Employees>();
  constructor(private databaseManager: DatabaseManagerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditEmpComponent>,) {
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
        console.log(element.Emp_Id + "emp id 42");
        this.getEmpId = element.Emp_Id;
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


  deleteEMPdata(id: number) {
    //this.isUpdated = true;
    //this.state = 1;
    // console.log(this.data.service.EMP_Id + "emp id eka mulin");
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.databaseManager.deleteEmployee(this.getEmpId);
        this.employeeData.splice(id, 1);
        //console.log(this.data.service.EMP_Id + "emp id eka 2");

        console.log("methnta awa delete eke");
        setTimeout(() => {
          this.dialog.closeAll();
        }, 500);
        setTimeout(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }, 600);
        // console.log(this.data.service.EMP_Id + "emp id eka 3");
      }
    })
  }


}
