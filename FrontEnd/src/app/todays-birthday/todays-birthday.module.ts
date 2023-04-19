import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodaysBirthdayPageRoutingModule } from './todays-birthday-routing.module';

import { TodaysBirthdayPage } from './todays-birthday.page';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TodaysBirthdayPageRoutingModule
  ],
  declarations: [TodaysBirthdayPage]
})
export class TodaysBirthdayPageModule {}
