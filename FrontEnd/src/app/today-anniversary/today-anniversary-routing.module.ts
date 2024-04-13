import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayAnniversaryPage } from './today-anniversary.page';

const routes: Routes = [
  {
    path: '',
    component: TodayAnniversaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayAnniversaryPageRoutingModule {}
