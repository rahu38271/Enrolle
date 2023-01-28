import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayAnniversaryPageRoutingModule } from './today-anniversary-routing.module';

import { TodayAnniversaryPage } from './today-anniversary.page';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TodayAnniversaryPageRoutingModule
  ],
  declarations: [TodayAnniversaryPage]
})
export class TodayAnniversaryPageModule {}
