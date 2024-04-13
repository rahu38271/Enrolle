import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FamilyReportComponent } from './family-report/family-report.component'

@NgModule({
  declarations: [FamilyReportComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:FamilyReportComponent}])
  ]
})
export class FamilyReportModuleModule { }
