import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsCreditHistoryPageRoutingModule } from './sms-credit-history-routing.module';

import { SmsCreditHistoryPage } from './sms-credit-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsCreditHistoryPageRoutingModule
  ],
  declarations: [SmsCreditHistoryPage]
})
export class SmsCreditHistoryPageModule {}
