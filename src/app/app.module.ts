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
import { getStorage, provideStorage } from '@angular/fire/storage';
//import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";


//import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

//import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/compat/analytics';

//test(working method)
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/compat/analytics';

// import {
//   getAnalytics,
//   provideAnalytics,
//   ScreenTrackingService,
//   UserTrackingService
// } from '@angular/fire/analytics';


//from angular material
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';



@NgModule({
  declarations: [
    AppComponent,
    PostEmpComponent,
    ViewEmployeesComponent,
    EditEmpComponent,
    HomeComponent,
    LoginComponent,
    MyAccountComponent
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
    AngularFireAnalyticsModule,
    //provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  //this was worked until, Adding angular fire analitics module. after that point this was getting NUll injection error
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    // provideAnalytics(() => getAnalytics()),
  ],

  exports: [
    AngularFireAnalyticsModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    //{ provide: ScreenTrackingService, useValue: {} }
    //  { provide: UserTrackingService, useValue: {} },
    //ScreenTrackingService,
    //  UserTrackingService,
    ScreenTrackingService,
    // UserTrackingService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
