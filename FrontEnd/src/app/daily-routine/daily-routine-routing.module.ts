import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRoutinePage } from './daily-routine.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRoutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRoutinePageRoutingModule {}
