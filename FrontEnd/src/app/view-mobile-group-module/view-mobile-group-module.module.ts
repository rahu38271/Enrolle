import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewMobileGroupComponent } from './view-mobile-group/view-mobile-group.component'

@NgModule({
  declarations: [ViewMobileGroupComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:ViewMobileGroupComponent}])
  ]
})
export class ViewMobileGroupModuleModule { }
