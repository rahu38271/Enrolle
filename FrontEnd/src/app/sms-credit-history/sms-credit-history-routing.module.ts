import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsCreditHistoryPage } from './sms-credit-history.page';

const routes: Routes = [
  {
    path: '',
    component: SmsCreditHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsCreditHistoryPageRoutingModule {}
