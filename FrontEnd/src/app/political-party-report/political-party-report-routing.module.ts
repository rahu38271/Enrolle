import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticalPartyReportPage } from './political-party-report.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticalPartyReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticalPartyReportPageRoutingModule {}
