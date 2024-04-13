import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Page } from './dashboard1.page';

const routes: Routes = [
  {
    path: '',
    component: Dashboard1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Dashboard1PageRoutingModule {}
