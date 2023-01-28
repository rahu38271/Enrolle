import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileDashboardPageRoutingModule } from './mobile-dashboard-routing.module';

import { MobileDashboardPage } from './mobile-dashboard.page';

 import { ChartModule, ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import {
  LineSeriesService,RangeColumnSeriesService, DataLabelService, StackingColumnSeriesService, CategoryService,
  StepAreaSeriesService, SplineSeriesService, ScrollBarService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
  SelectionService, ScatterSeriesService, ZoomService, ColumnSeriesService, AreaSeriesService, RangeAreaSeriesService
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileDashboardPageRoutingModule,
    ChartModule,
    ChartAllModule, AccumulationChartAllModule, AccumulationChartModule, 
  ],
  declarations: [MobileDashboardPage],
  providers: [   
     RangeColumnSeriesService, 
    LineSeriesService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
        StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
        PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationDataLabelService, SelectionService, ScatterSeriesService,
         AreaSeriesService, RangeAreaSeriesService
  ]
    
})
export class MobileDashboardPageModule {}
