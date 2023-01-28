import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileDashboardPage } from './mobile-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MobileDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileDashboardPageRoutingModule {}
