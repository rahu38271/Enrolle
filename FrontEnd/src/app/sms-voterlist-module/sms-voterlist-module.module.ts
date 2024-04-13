import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SmsVoterlistComponent } from './sms-voterlist/sms-voterlist.component'

@NgModule({
  declarations: [SmsVoterlistComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:SmsVoterlistComponent}])
  ]
})
export class SmsVoterlistModuleModule { }
