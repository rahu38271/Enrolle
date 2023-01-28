import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InclinationReportPage } from './inclination-report.page';

const routes: Routes = [
  {
    path: '',
    component: InclinationReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InclinationReportPageRoutingModule {}
