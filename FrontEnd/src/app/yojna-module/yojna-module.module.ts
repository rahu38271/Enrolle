import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YojnaComponent } from './yojna/yojna.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddYojnaComponent } from './add-yojna/add-yojna.component';
import { EditYojnaComponent } from './edit-yojna/edit-yojna.component';



@NgModule({
  declarations: [
    YojnaComponent,
    AddYojnaComponent,
    EditYojnaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: YojnaComponent}, {path:'add-yojna', component: AddYojnaComponent}, {path:'edit-yojna', component: EditYojnaComponent}])
  ]
})
export class YojnaModuleModule { }
