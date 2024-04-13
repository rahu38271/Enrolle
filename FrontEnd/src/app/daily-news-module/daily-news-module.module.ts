import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { DailyNewsComponent } from './daily-news/daily-news.component'
import {AddDailyNewsComponent } from './add-daily-news/add-daily-news.component'
import { EditDailyNewsComponent } from './edit-daily-news/edit-daily-news.component'

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [DailyNewsComponent,AddDailyNewsComponent,EditDailyNewsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component: DailyNewsComponent}, {path:'add-daily-news', component:  AddDailyNewsComponent}, {path: 'edit-daily-news', component:EditDailyNewsComponent }])
  ]
})
export class DailyNewsModuleModule { }
