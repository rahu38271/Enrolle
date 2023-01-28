import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoterInclinationAllPageRoutingModule } from './voter-inclination-all-routing.module';

import { VoterInclinationAllPage } from './voter-inclination-all.page';
import { ChartModule,AccumulationChartModule   } from '@syncfusion/ej2-angular-charts';
import {PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService, CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService, DataLabelService,
    StepAreaSeriesService, SplineSeriesService, StripLineService,
    SelectionService, ScatterSeriesService, ZoomService, AreaSeriesService, RangeAreaSeriesService
 } from '@syncfusion/ej2-angular-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModule,
    AccumulationChartModule,
    VoterInclinationAllPageRoutingModule
  ],
  declarations: [VoterInclinationAllPage],
  providers: [LineSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationDataLabelService, SelectionService, ScatterSeriesService, AreaSeriesService, RangeAreaSeriesService ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VoterInclinationAllPageModule {}
