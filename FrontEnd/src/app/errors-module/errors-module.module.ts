import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from './errors/errors.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Error1Component } from './error1/error1.component';
import { Error2Component } from './error2/error2.component';
import { Error3Component } from './error3/error3.component';



@NgModule({
  declarations: [
    ErrorsComponent,
    Error1Component,
    Error2Component,
    Error3Component
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([
      {path:'', component:ErrorsComponent},
      {path:'error1', component:Error1Component},
      {path:'error2', component:Error2Component},
      {path:'error3', component:Error3Component}
    ])
  ]
})
export class ErrorsModuleModule { }
