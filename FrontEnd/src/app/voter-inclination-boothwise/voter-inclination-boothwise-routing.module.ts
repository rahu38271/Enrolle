import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoterInclinationBoothwisePage } from './voter-inclination-boothwise.page';

const routes: Routes = [
  {
    path: '',
    component: VoterInclinationBoothwisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterInclinationBoothwisePageRoutingModule {}
