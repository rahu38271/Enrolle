import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardComponent } from './ward/ward.component';
import { AddWardComponent } from './add-ward/add-ward.component';
import { EditWardComponent } from './edit-ward/edit-ward.component';
import { ImportWardComponent } from './import-ward/import-ward.component';
import {IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import {RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    WardComponent,
    AddWardComponent,
    EditWardComponent,
    ImportWardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: WardComponent}, {path:'add-ward', component: AddWardComponent}, {path:'edit-ward', component: EditWardComponent}, {path:'import-ward', component: ImportWardComponent} ])
  ]
})
export class WardModuleModule { }
