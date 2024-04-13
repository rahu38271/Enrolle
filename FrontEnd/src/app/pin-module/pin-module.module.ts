import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinComponent } from './pin/pin.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  declarations: [
    PinComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    //NgOtpInputModule,
    RouterModule.forChild([{path:'', component: PinComponent}])
  ]
})
export class PinModuleModule { }
