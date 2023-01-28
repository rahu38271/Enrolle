import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRequestComponent } from './user-request/user-request.component'

@NgModule({
  declarations: [UserRequestComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:UserRequestComponent}])
  ]
})
export class UserRequestModuleModule { }
