import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoterInclinationListPage } from './voter-inclination-list.page';

const routes: Routes = [
  {
    path: '',
    component: VoterInclinationListPage,
    children:[
      {
        path:'voter-inclination-all',
        children:[
          {
            path:'',
            loadChildren: ()=> import ('../voter-inclination-all/voter-inclination-all.module').then (m => m.VoterInclinationAllPageModule)
          }
        ]
      },
      {
        path:'voter-inclination-boothwise',
        children: [
          {
            path:'',
            loadChildren: () => import ('../voter-inclination-boothwise/voter-inclination-boothwise.module').then (m => m.VoterInclinationBoothwisePageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo:'/voter-inclination-list/voter-inclination-all',
        pathMatch: 'full'
      },
    ]
  },
  {
    path:'',
    redirectTo:'/voter-inclination-list/voter-inclination-all',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterInclinationListPageRoutingModule {}
