import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsScheduleReportPageRoutingModule } from './sms-schedule-report-routing.module';

import { SmsScheduleReportPage } from './sms-schedule-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SmsScheduleReportPageRoutingModule
  ],
  declarations: [SmsScheduleReportPage]
})
export class SmsScheduleReportPageModule {}
