import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import {  RouterModule} from '@angular/router'
import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from  'ng-otp-input';
import { OtpPage } from '../otp/otp.page';

@NgModule({
  declarations: [LoginComponent,OtpPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgOtpInputModule,
    HttpClientModule,
    RouterModule.forChild([{path:'', component: LoginComponent}])
  ]
})
export class LoginModuleModule { }
