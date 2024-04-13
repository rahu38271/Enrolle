import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [

      {
        path: 'mobile-dashboard',
        children:[
          {
            path: '',
            loadChildren: () => import('../mobile-dashboard/mobile-dashboard.module').then( m => m.MobileDashboardPageModule)
          }
        ]
      },
      {
        path: 'birthday',
        children:[
          {
            path:'',
            loadChildren: () => import('../todays-birthday/todays-birthday.module').then(m => m.TodaysBirthdayPageModule)
          }
        ]
      },
      {
        path: 'anniversary',
        children:[
          {
            path:'',
            loadChildren: () => import('../today-anniversary/today-anniversary.module').then(m => m.TodayAnniversaryPageModule)
          }
        ]
      },
      {
        path: 'daily-work',
        children: [
          {
            path:'',
            loadChildren: () => import('../daily-work/daily-work.module').then(m => m.DailyWorkPageModule)
          }
        ]
      },
      {
        path: 'daily-news',
        children:[
          {
            path:'',
            loadChildren: () => import('../daily-news/daily-news.module').then(m => m.DailyNewsPageModule)
          }
        ]
      },
      {
        path: 'daily-routine',
        children:[
          {
            path:'',
            loadChildren: () => import('../daily-routine/daily-routine.module').then(m => m.DailyRoutinePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/mobile-dashboard',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/home/mobile-dashboard',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
