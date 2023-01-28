import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoothComponent } from './booth/booth.component';
import { AddBoothComponent } from './add-booth/add-booth.component';
import { EditBoothComponent } from './edit-booth/edit-booth.component';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import {RouterModule } from '@angular/router';
import { ImporBoothComponent } from './impor-booth/impor-booth.component'
import { IonSelectSearchLibModule } from 'ionic-select-search';


@NgModule({
  declarations: [
    BoothComponent,
    AddBoothComponent,
    EditBoothComponent,
    ImporBoothComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    IonSelectSearchLibModule,
    RouterModule.forChild([{path:'', component:BoothComponent}, {path:'add-booth', component:AddBoothComponent}, {path:'edit-booth', component:EditBoothComponent}, {path:'impor-booth', component:ImporBoothComponent}])
  ]
})
export class BoothModuleModule { }
