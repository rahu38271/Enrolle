import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovedComponent } from './approved/approved.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { RejectedComponent } from './rejected/rejected.component';


@NgModule({
  declarations: [
    ApprovedComponent,
    RejectedComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'', component:ApprovedComponent},
      {path:'rejected', component:RejectedComponent}
    ])
  ]
})
export class AppointmentReportModule { }
