import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsArchieveReportPage } from './sms-archieve-report.page';

const routes: Routes = [
  {
    path: '',
    component: SmsArchieveReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsArchieveReportPageRoutingModule {}
