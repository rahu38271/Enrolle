import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodaysBirthdayPage } from './todays-birthday.page';

const routes: Routes = [
  {
    path: '',
    component: TodaysBirthdayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaysBirthdayPageRoutingModule {}
