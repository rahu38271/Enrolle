import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule} from '@angular/forms'
import {RouterModule } from '@angular/router'
import {MobileMatchComponent } from './mobile-match/mobile-match.component'

@NgModule({
  declarations: [MobileMatchComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:MobileMatchComponent}])
  ]
})
export class MobileMatchModuleModule { }
