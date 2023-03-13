import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnapurnaComponent } from './annapurna/annapurna.component';
import { AddAnnapurnaComponent } from './add-annapurna/add-annapurna.component';
import { EditAnnapurnaComponent } from './edit-annapurna/edit-annapurna.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AnnapurnaComponent,
    AddAnnapurnaComponent,
    EditAnnapurnaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:AnnapurnaComponent},{path:'add-annapurna', component:AddAnnapurnaComponent},{path:'edit-annapurna', component:EditAnnapurnaComponent}])
  ]
})
export class AnnapurnaModuleModule { }