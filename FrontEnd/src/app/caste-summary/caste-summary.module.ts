import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasteSummaryPageRoutingModule } from './caste-summary-routing.module';

import { CasteSummaryPage } from './caste-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasteSummaryPageRoutingModule
  ],
  declarations: [CasteSummaryPage]
})
export class CasteSummaryPageModule {}
