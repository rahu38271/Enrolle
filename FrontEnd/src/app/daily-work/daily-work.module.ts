import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyWorkPageRoutingModule } from './daily-work-routing.module';

import { DailyWorkPage } from './daily-work.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyWorkPageRoutingModule
  ],
  declarations: [DailyWorkPage]
})
export class DailyWorkPageModule {}
