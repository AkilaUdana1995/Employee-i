import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostEmpComponent } from './post-emp/post-emp.component';

//angular fire imports
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';


//from angular material
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    PostEmpComponent,
    ViewEmployeesComponent,
    EditEmpComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
