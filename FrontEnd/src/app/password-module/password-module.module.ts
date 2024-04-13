import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule,   } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordComponent } from './password/password.component';



@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'', component: PasswordComponent} ])
  ]
})
export class PasswordModuleModule { }
