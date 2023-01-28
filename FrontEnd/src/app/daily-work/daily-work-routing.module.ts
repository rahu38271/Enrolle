import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyWorkPage } from './daily-work.page';

const routes: Routes = [
  {
    path: '',
    component: DailyWorkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyWorkPageRoutingModule {}
