import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsDeliveryReportPage } from './sms-delivery-report.page';

const routes: Routes = [
  {
    path: '',
    component: SmsDeliveryReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsDeliveryReportPageRoutingModule {}
