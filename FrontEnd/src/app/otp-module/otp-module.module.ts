import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './otp/otp.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    //NgOtpInputModule,
    RouterModule.forChild([{path:'', component: OtpComponent}])
    ]
})
export class OtpModuleModule { }
