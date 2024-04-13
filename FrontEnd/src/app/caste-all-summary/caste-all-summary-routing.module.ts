import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasteAllSummaryPage } from './caste-all-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CasteAllSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasteAllSummaryPageRoutingModule {}
