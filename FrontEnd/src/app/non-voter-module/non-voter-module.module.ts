import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NonVoterComponent } from './non-voter/non-voter.component'
import { AddVoterComponent } from './add-voter/add-voter.component'

@NgModule({
  declarations: [NonVoterComponent,AddVoterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: NonVoterComponent},{path:'add-voter', component: AddVoterComponent}])
  ]
})
export class NonVoterModuleModule { }
