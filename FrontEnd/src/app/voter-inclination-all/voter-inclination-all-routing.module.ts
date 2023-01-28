import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoterInclinationAllPage } from './voter-inclination-all.page';

const routes: Routes = [
  {
    path: '',
    component: VoterInclinationAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterInclinationAllPageRoutingModule {}
