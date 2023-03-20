import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewVoterComponent } from './new-voter/new-voter.component';
import { AddNewVoterComponent } from './add-new-voter/add-new-voter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditNewVoterComponent } from './edit-new-voter/edit-new-voter.component';



@NgModule({
  declarations: [
    NewVoterComponent,
    AddNewVoterComponent,
    EditNewVoterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:NewVoterComponent},{path:'add-new-voter', component:AddNewVoterComponent},{path:'edit-new-voter', component:EditNewVoterComponent}])
  ]
})
export class NewVoterModuleModule { }
