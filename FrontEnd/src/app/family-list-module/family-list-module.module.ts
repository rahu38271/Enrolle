import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { FamilyListComponent} from './family-list/family-list.component'
import { ViewFamilyComponent} from './view-family/view-family.component'

@NgModule({
  declarations: [FamilyListComponent,ViewFamilyComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:FamilyListComponent},{path:'view-family', component:ViewFamilyComponent}])
  ]
})
export class FamilyListModuleModule { }
