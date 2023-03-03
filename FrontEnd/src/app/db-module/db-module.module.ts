import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbComponent } from './db/db.component';
import { IonicModule } from '@ionic/angular'
import { FormsModule} from '@angular/forms'
import { RouterModule} from '@angular/router'


@NgModule({
  declarations: [
    DbComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:DbComponent}])
  ]
})
export class DbModuleModule { }
