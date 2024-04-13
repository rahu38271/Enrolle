import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsScheduleReportPage } from './sms-schedule-report.page';

const routes: Routes = [
  {
    path: '',
    component: SmsScheduleReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsScheduleReportPageRoutingModule {}
