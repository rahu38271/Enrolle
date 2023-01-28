import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsDeliveryReportPageRoutingModule } from './sms-delivery-report-routing.module';

import { SmsDeliveryReportPage } from './sms-delivery-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SmsDeliveryReportPageRoutingModule
  ],
  declarations: [SmsDeliveryReportPage]
})
export class SmsDeliveryReportPageModule {}
