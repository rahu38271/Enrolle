import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasteReportPage } from './caste-report.page';

const routes: Routes = [
  {
    path: '',
    component: CasteReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasteReportPageRoutingModule {}
