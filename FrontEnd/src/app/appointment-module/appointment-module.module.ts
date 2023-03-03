import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular'
import { RouterModule} from '@angular/router'
import { FormsModule} from '@angular/forms'
import {AppointmentComponent } from './appointment/appointment.component'
import { AddAppointmentComponent } from './add-appointment/add-appointment.component'
import { EditAppointmentComponent} from './edit-appointment/edit-appointment.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppointmentComponent,AddAppointmentComponent,EditAppointmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    RouterModule.forChild([{path: '', component:AppointmentComponent}, {path:'add-appointment', component:AddAppointmentComponent},{path:'edit-appointment', component:EditAppointmentComponent}])
  ]
})
export class AppointmentModuleModule { }
