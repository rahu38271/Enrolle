import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { TodaysAppointmentComponent } from './todays-appointment/todays-appointment.component';
import { AppointmentByDateComponent } from './appointment-by-date/appointment-by-date.component';
import { AdminwiseComponent } from './adminwise/adminwise.component';
import { AppointmentByAdminComponent } from './appointment-by-admin/appointment-by-admin.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';

import { ChartModule,AccumulationChartModule   } from '@syncfusion/ej2-angular-charts';
import {PieSeriesService,ExportService, AccumulationTooltipService, AccumulationDataLabelService, CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService, DataLabelService,
    StepAreaSeriesService, SplineSeriesService, StripLineService,AccumulationLegendService,
    SelectionService, ScatterSeriesService, ZoomService, AreaSeriesService, RangeAreaSeriesService
 } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [AppointmentComponent,AddAppointmentComponent,EditAppointmentComponent, TodaysAppointmentComponent, AppointmentByDateComponent, AdminwiseComponent, AppointmentByAdminComponent, AllAppointmentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    ChartModule,
    AccumulationChartModule,
    RouterModule.forChild([
      {path: '', component:AppointmentComponent}, 
      {path:'all-appointments', component:AllAppointmentsComponent},
      {path:'add-appointment', component:AddAppointmentComponent},
      {path:'edit-appointment', component:EditAppointmentComponent},
      {path:'today-appointment', component:TodaysAppointmentComponent},
      {path:'appointment-byDate', component:AppointmentByDateComponent},
      {path:'appointment-adminwise', component:AdminwiseComponent},
      {path:'appointment-byAdmin', component:AppointmentByAdminComponent},
    ])
  ],
  providers: [LineSeriesService,ExportService,StackingColumnSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationLegendService,  AccumulationDataLabelService, SelectionService, ScatterSeriesService, AreaSeriesService, RangeAreaSeriesService ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentModuleModule { }
