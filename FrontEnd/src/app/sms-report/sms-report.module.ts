import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsReportPageRoutingModule } from './sms-report-routing.module';

import { SmsReportPage } from './sms-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsReportPageRoutingModule
  ],
  declarations: [SmsReportPage]
})
export class SmsReportPageModule {}
