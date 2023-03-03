import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRoutinePageRoutingModule } from './daily-routine-routing.module';

import { DailyRoutinePage } from './daily-routine.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRoutinePageRoutingModule
  ],
  declarations: [DailyRoutinePage]
})
export class DailyRoutinePageModule {}
