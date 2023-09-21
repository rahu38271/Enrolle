import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterDashboardComponent } from './voter-dashboard/voter-dashboard.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule, ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import {
  LineSeriesService,RangeColumnSeriesService, DataLabelService, StackingColumnSeriesService, CategoryService,
  StepAreaSeriesService, SplineSeriesService, ScrollBarService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
  SelectionService, ScatterSeriesService, ZoomService, ColumnSeriesService, AreaSeriesService, RangeAreaSeriesService
} from '@syncfusion/ej2-angular-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    VoterDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgSelectModule,
    NgSelectModule,
    ChartAllModule, AccumulationChartAllModule, AccumulationChartModule, 
    TranslateModule,
    RouterModule.forChild([{path:'', component:VoterDashboardComponent}])
  ]
})
export class VoterDashboardModuleModule { }
