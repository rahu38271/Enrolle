import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyNewsPage } from './daily-news.page';

const routes: Routes = [
  {
    path: '',
    component: DailyNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyNewsPageRoutingModule {}
