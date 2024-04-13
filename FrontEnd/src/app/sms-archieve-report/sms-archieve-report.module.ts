import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsArchieveReportPageRoutingModule } from './sms-archieve-report-routing.module';

import { SmsArchieveReportPage } from './sms-archieve-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsArchieveReportPageRoutingModule
  ],
  declarations: [SmsArchieveReportPage]
})
export class SmsArchieveReportPageModule {}
