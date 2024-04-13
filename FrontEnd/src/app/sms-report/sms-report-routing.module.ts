import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsReportPage } from './sms-report.page';

const routes: Routes = [
  {
    path: '',
    component: SmsReportPage,
    children: [
      {
        path: 'sms-campaign-report',
        loadChildren: () => import('../sms-campaign-report/sms-campaign-report.module').then(m => m.SmsCampaignReportPageModule)
      },
      {
        path: 'sms-delivery-report',
        loadChildren: () => import('../sms-delivery-report/sms-delivery-report.module').then(m => m.SmsDeliveryReportPageModule)
      },
      {
        path: 'sms-schedule-report',
        loadChildren: () => import('../sms-schedule-report/sms-schedule-report.module').then(m => m.SmsScheduleReportPageModule)
      },
      {
        path: 'sms-archieve-report',
        loadChildren: () => import('../sms-archieve-report/sms-archieve-report.module').then(m => m.SmsArchieveReportPageModule)
      },
      {
        path: 'sms-credit-history',
        loadChildren: () => import('../sms-credit-history/sms-credit-history.module').then(m => m.SmsCreditHistoryPageModule)
      },
      {
        path: '',
        redirectTo: '/sms-report/sms-campaign-report',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsReportPageRoutingModule {}
