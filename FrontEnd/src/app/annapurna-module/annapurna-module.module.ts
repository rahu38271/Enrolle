import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnapurnaComponent } from './annapurna/annapurna.component';
import { AddAnnapurnaComponent } from './add-annapurna/add-annapurna.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AnnapurnaComponent,
    AddAnnapurnaComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: AnnapurnaComponent}, {path: 'add-annapurna', component:AddAnnapurnaComponent }])
  ]
})
export class AnnapurnaModuleModule { }
