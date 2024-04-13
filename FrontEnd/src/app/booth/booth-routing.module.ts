import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoothPage } from './booth.page';

const routes: Routes = [
  {
    path: '',
    component: BoothPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoothPageRoutingModule {}
