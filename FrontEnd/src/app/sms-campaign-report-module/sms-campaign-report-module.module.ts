import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ViewReportsComponent } from './view-reports/view-reports.component'


@NgModule({
  declarations: [ViewReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path:'', component:ViewReportsComponent}])
  ]
})
export class SmsCampaignReportModuleModule { }
