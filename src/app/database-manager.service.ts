import { Injectable } from '@angular/core';

//firestore imports
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employees } from './Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  //db paths
  private readonly DBPATH_PRODUCT = "Employees";

  // collections ref
  private EmployeesRef: AngularFirestoreCollection<Employees>;

  constructor(private firestore: AngularFirestore) {
    this.EmployeesRef = this.firestore.collection(this.DBPATH_PRODUCT);
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
}
