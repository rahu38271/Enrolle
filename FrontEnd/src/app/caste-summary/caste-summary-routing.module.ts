import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasteSummaryPage } from './caste-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CasteSummaryPage,
    children: [
      
      {
        path:'caste-all-summary',
        children:[
          {
            path:'',
            loadChildren: ()=>import ('../caste-all-summary/caste-all-summary.module').then(m=> m.CasteAllSummaryPageModule)
          }
        ]
      },
      {
        path:'caste-boothwise-summary',
        children: [
          {
            path:'',
            loadChildren: ()=>import ('../caste-boothwise-summary/caste-boothwise-summary.module').then(m=> m.CasteBoothwiseSummaryPageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo:'/caste-summary/caste-all-summary',
        pathMatch: 'full'
      },
    ]
  },
  {
    path:'',
    redirectTo:'/caste-summary/caste-all-summary',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasteSummaryPageRoutingModule {}
