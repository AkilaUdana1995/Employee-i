import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments } from './../dataSets/departments';
import { DatabaseManagerService } from './../database-manager.service';
import { Router } from '@angular/router';

//sweet alert
import Swal from 'sweetalert2'
import { Employees } from './../Models/employee';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-post-emp',
  templateUrl: './post-emp.component.html',
  styleUrls: ['./post-emp.component.scss']
})
export class PostEmpComponent implements OnInit {


  Departments = Departments.empDepartments;
  public isUpdateRecord: boolean = false
  public EMP_Id: string = ""
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
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

  postEMPdata() {
    const {
      name,
      address,
      NIC,
      department,
      EMP_code,
      gender,
    } = this.registerForm.value;
    let newEmployee = {
      Emp_Id: this.databaseManager.generateKey(),
      name: name,
      address: address,
      NIC: NIC,
      department: department,
      EMP_code: EMP_code,
      gender: gender,

    }
    this.databaseManager.postNewEmployee(newEmployee);
    setTimeout(() => {
      this.postedAlert();
    }, 1000);

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000);



  }

  postedAlert() {
    Swal.fire(
      'Good job!',
      'Your entry has been recorded, click ok to go home page!',
      'success'
    )
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

  //method to load employee data to form using default patching techniques
  loadEmployeeData(Emp_Id: string) {
    this.databaseManager.getSingleEmployeeData(Emp_Id).then((element: Employees) => {
      let {
        name,
        address,
        NIC,
        department,
        EMP_code,
        gender,
      } = element;
      this.registerForm.patchValue({
        name,
        address,
        NIC,
        department,
        EMP_code,
        gender,
      })
    })
  }


  closeMenu() {
    this.dialog.closeAll();
    console.log("awa");

  }

}
