import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyNewsPageRoutingModule } from './daily-news-routing.module';

import { DailyNewsPage } from './daily-news.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyNewsPageRoutingModule
  ],
  declarations: [DailyNewsPage]
})
export class DailyNewsPageModule {}
