import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyNewsPageRoutingModule } from './daily-news-routing.module';

import { DailyNewsPage } from './daily-news.page';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTablesModule,
    DailyNewsPageRoutingModule
  ],
  declarations: [DailyNewsPage]
})
export class DailyNewsPageModule {}
