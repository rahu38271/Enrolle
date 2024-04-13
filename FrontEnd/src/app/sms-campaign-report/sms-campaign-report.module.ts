import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsCampaignReportPageRoutingModule } from './sms-campaign-report-routing.module';

import { SmsCampaignReportPage } from './sms-campaign-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SmsCampaignReportPageRoutingModule
  ],
  declarations: [SmsCampaignReportPage]
})
export class SmsCampaignReportPageModule {}
