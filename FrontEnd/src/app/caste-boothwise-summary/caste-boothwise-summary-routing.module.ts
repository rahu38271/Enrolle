import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasteBoothwiseSummaryPage } from './caste-boothwise-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CasteBoothwiseSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasteBoothwiseSummaryPageRoutingModule {}
