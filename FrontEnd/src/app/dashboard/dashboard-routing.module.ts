import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path:'inclination-report',
        children:[
          {
            path:'',
            loadChildren: ()=> import ('../inclination-report/inclination-report.module').then(m => m.InclinationReportPageModule)
          }
        ]
      },
      {
        path:'caste-report',
        children:[
          {
            path:'',
            loadChildren: ()=> import ('../caste-report/caste-report.module').then(m => m.CasteReportPageModule)
          }
        ]
      },
      {
        path:'political-party-report',
        children:[
          {
            path:'',
            loadChildren: ()=> import ('../political-party-report/political-party-report.module').then(m => m.PoliticalPartyReportPageModule)
          }
        ]
      },
      {
        path:'occupation-report',
        children:[
          {
            path:'',
            loadChildren: ()=> import ('../occupation-report/occupation-report.module').then(m => m.OccupationReportPageModule)
          }
        ]
      },
      {
        path:'voter-report',
        children:[
          {
            path:'',
            loadChildren: ()=> import ('../voter-report/voter-report.module').then(m => m.VoterReportPageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo: '/dashboard/inclination-report',
        pathMatch: 'full'
      },
    ]
  },
  {
    path:'',
    redirectTo: '/dashboard/inclination-report',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
