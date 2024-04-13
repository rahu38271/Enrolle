import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasteBoothwiseSummaryPageRoutingModule } from './caste-boothwise-summary-routing.module';

import { CasteBoothwiseSummaryPage } from './caste-boothwise-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasteBoothwiseSummaryPageRoutingModule
  ],
  declarations: [CasteBoothwiseSummaryPage]
})
export class CasteBoothwiseSummaryPageModule {}
