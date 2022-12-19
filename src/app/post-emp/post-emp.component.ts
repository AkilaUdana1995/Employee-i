import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments } from './../dataSets/departments';

@Component({
  selector: 'app-post-emp',
  templateUrl: './post-emp.component.html',
  styleUrls: ['./post-emp.component.scss']
})
export class PostEmpComponent implements OnInit {
  Departments = Departments.empDepartments;
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
        Validators.minLength(10),
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


  constructor() { }

  ngOnInit(): void {
  }

  registerEmployee(){
    
  }

}
