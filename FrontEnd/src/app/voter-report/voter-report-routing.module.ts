import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoterReportPage } from './voter-report.page';

const routes: Routes = [
  {
    path: '',
    component: VoterReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterReportPageRoutingModule {}
