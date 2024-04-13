import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserwiseComponent } from './userwise/userwise.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule} from 'ngx-pagination';
import { DatewiseReportComponent } from './datewise-report/datewise-report.component';


@NgModule({
  declarations: [
    ReportsComponent,
    UserwiseComponent,
    DatewiseReportComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'', component:ReportsComponent},
      {path:'userwise', component:UserwiseComponent},
      {path:'datewise', component:DatewiseReportComponent},
    ])
  ]
})
export class ReportsModuleModule { }
