import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments } from './../dataSets/departments';
import { DatabaseManagerService } from './../database-manager.service';
import { Router } from '@angular/router';

//sweet alert
import Swal from 'sweetalert2'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employees } from '../Models/employee';


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent implements OnInit {
  public employeeData: Array<Employees> = new Array<Employees>();
  public isUpdated: boolean = false;
  public state: number = 8;
  Departments = Departments.empDepartments;
  genderList: any = ['male ', 'female', 'prfer not to say'];
  //getting data through a form with validators
  registerForm = new FormGroup(
    {
      name: new FormControl(
        '',
        [Validators.required]
      ),
      address: new FormControl(
        '',
        [Validators.required,]
      ),
      NIC: new FormControl(
        '',
        [Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(9),
        Validators.maxLength(12),
        ]
      ),

      EMP_code: new FormControl(
        '',
        [Validators.required,
        Validators.pattern("^[0-9]*$")]
      ),

      gender: new FormControl(
        '',
        [Validators.required,]
      ),

      department: new FormControl(
        '',
        [Validators.required,]
      ),
    }
  );

  constructor(private databaseManager: DatabaseManagerService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditEmpComponent>,
    private dialog: MatDialog
  ) {
    if (data) {
      this.loadEMPdata();
      this.isUpdated = true;
      this.state = 1;
    }

  }

  ngOnInit(): void {
    this.state = this.data.id;
    console.log(this.data.id + "id val");
    console.log(this.state + "state value");


  }

  updatedAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Updated Sucessfully!!',
      showConfirmButton: false,
      timer: 1500
    })

  }


  //method to load editable feilds to form
  loadEMPdata() {
    this.registerForm.patchValue({
      name: this.data.service.name,
      address: this.data.service.address,
      NIC: this.data.service.NIC,
      department: this.data.service.department,
      EMP_code: this.data.service.EMP_code,
      gender: this.data.service.gender,
    })
  };

  //method to edit EMP data, using form
  editEMPdata() {

    const {
      //editable fields
      name,
      address,
      NIC,
      department,
      EMP_code,
      gender,
    } = this.registerForm.value

    let updatedModel = {
      Emp_Id: this.data.service.Emp_Id,
      name,
      address,
      NIC,
      department,
      EMP_code,
      gender
    }
    this.databaseManager.updateEmployees(this.data.service.Emp_Id, updatedModel).then((res) => {
      if (res) {

        setTimeout(() => {
          this.dialog.closeAll();
          console.log("awooooo");

        }, 900);

        this.updatedAlert();
        setTimeout(() => {
          this.router.navigate(['/viewEmployees']);
        }, 1000);


      }
    })
  }

  test() {
    console.log(this.data.service.Emp_Id + "emp id eka");
    this.databaseManager.deleteEmployee(this.data.service.Emp_Id);
    console.log("deleted");

  }

  deleteEMPdata() {
    this.isUpdated = true;
    this.state = 1;
    console.log(this.data.service.EMP_Id + "emp id eka mulin");
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
        this.databaseManager.deleteEmployee(this.data.service.Emp_Id);
//this.employeeData.splice(id,1);
        console.log(this.data.service.EMP_Id + "emp id eka 2");

        console.log("methnta awa delete eke");
        setTimeout(() => {
          this.dialog.closeAll();
        }, 1500);
        setTimeout(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }, 1600);
        console.log(this.data.service.EMP_Id + "emp id eka 3");
      }
    })
  }

}
