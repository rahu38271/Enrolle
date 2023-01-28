import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InclinationReportPageRoutingModule } from './inclination-report-routing.module';

import { InclinationReportPage } from './inclination-report.page';
import { ChartModule,AccumulationChartModule   } from '@syncfusion/ej2-angular-charts';
import {PieSeriesService,ExportService, AccumulationTooltipService, AccumulationDataLabelService, CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService, DataLabelService,
    StepAreaSeriesService, SplineSeriesService, StripLineService,AccumulationLegendService,
    SelectionService, ScatterSeriesService, ZoomService, AreaSeriesService, RangeAreaSeriesService
 } from '@syncfusion/ej2-angular-charts';
 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InclinationReportPageRoutingModule,
    ChartModule,
    AccumulationChartModule,
  ],
  declarations: [InclinationReportPage],
  providers: [LineSeriesService,ExportService,StackingColumnSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationLegendService,  AccumulationDataLabelService, SelectionService, ScatterSeriesService, AreaSeriesService, RangeAreaSeriesService ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InclinationReportPageModule {}
