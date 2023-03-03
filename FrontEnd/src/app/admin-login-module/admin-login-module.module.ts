import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: AdminLoginComponent}])
  ]
})
export class AdminLoginModuleModule { }
