import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { SignupComponent } from './signup/signup.component'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{path:'', component: SignupComponent}])
  ]
})
export class SignupModuleModule { }
