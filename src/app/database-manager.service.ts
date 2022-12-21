import { Injectable } from '@angular/core';

//firestore imports
import { Firestore, collectionData, collection, getFirestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employees } from './Models/employee';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  //db paths
  private readonly DBPATH_EMP = "Employees";

  // collections ref
  private EmployeesRef: AngularFirestoreCollection<Employees>;

  constructor(private firestore: AngularFirestore) {
    this.EmployeesRef = this.firestore.collection(this.DBPATH_EMP);
  }

  generateKey(): string {
    //return "";
    return this.firestore.createId();
  }

  postNewEmployee(employeeObj: Employees) {
    new Promise<void>((resolve, reject) => {
      if (employeeObj) {
        this.EmployeesRef.doc(employeeObj.Emp_Id).set(employeeObj).then((res) => {
          {
            resolve(res);

          }
        })
      }
      else
        reject("error");

    })
  }


  //method to get single employee data
  getSingleEmployeeData(Emp_Id: string) {
    return new Promise<Employees>((resolve, reject) => {
      this.EmployeesRef.doc(Emp_Id).get().subscribe((result) => {
        if (result.exists) {
          resolve(<Employees>result.data());
          console.log(result.data());
        }
      })
    })
  }

  //getAllEmployeeData
  getEmployees() {
    return new Promise<Array<Employees>>((resolve, reject) => {
      this.firestore.collection(this.DBPATH_EMP, res => res

      ).get().subscribe(elements => {
        resolve(<Array<Employees>>elements.docs.map(doc => doc.data()));
      })
    })
  }

  //method to update employee data
  // updateRepairServices(serviceId: string, data: any) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.RepairServiceRef.doc(serviceId).update(data).then(e => {
  //       resolve(true)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // }


  updateEmployees(Emp_Id: string, data: any) {
    return new Promise<any>((resolve, reject) => {
      this.EmployeesRef.doc(Emp_Id).update(data).then((result) => {
          resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
  }


  //method to delete employee
  deleteEmployee(EMP_Id: string) {
    return new Promise<any>((resolve, reject) => {
      this.EmployeesRef.doc(EMP_Id).delete().then(e => {
        resolve(true);
      }).catch(err => {
        reject(err);
      })
    })
  }

}
