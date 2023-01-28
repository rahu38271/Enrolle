import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OccupationReportPage } from './occupation-report.page';

const routes: Routes = [
  {
    path: '',
    component: OccupationReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OccupationReportPageRoutingModule {}
