import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintComponent } from './complaint/complaint.component';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';
import { ResolvedComponent } from './resolved/resolved.component';
import { PendingComponent } from './pending/pending.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { AllComplaintsComponent } from './all-complaints/all-complaints.component';
import { TodaysComplaintComponent } from './todays-complaint/todays-complaint.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ComplaintComponent,
    AddComplaintComponent,
    EditComplaintComponent,
    ResolvedComponent,
    PendingComponent,
    AllComplaintsComponent,
    TodaysComplaintComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgSelectModule,
    RouterModule.forChild([
      {path:'', component:ComplaintComponent},
      {path:'all-complaints', component:AllComplaintsComponent},
      {path:'add-complaint', component:AddComplaintComponent},
      {path:'edit-complaint', component:EditComplaintComponent},
      {path:'resolved-complaint', component:ResolvedComponent},
      {path:'pending-complaint', component:PendingComponent},
      {path:'todays-complaint', component:TodaysComplaintComponent}
    ])
  ]
})
export class ComplaintModuleModule { }
