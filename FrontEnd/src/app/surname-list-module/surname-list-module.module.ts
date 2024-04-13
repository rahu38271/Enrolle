import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { IonicModule} from '@ionic/angular'
import { RouterModule} from '@angular/router'
import { SurnameComponent } from './surname/surname.component'
import { SurnameDetailsComponent } from './surname-details/surname-details.component'

@NgModule({
  declarations: [SurnameComponent,SurnameDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path:'', component:SurnameComponent },{path:'surname-details', component:SurnameDetailsComponent }])
  ]
})
export class SurnameListModuleModule { }
