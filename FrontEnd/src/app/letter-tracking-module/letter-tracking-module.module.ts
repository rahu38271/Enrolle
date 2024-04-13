import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterTrackingComponent } from './letter-tracking/letter-tracking.component';
import { AddLetterComponent } from './add-letter/add-letter.component';
import { EditLetterComponent } from './edit-letter/edit-letter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubletterComponent } from './subletter/subletter.component';
import { AllLettersComponent } from './all-letters/all-letters.component';
import { CompletedLettersComponent } from './completed-letters/completed-letters.component';
import { PendingLettersComponent } from './pending-letters/pending-letters.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LetterByDateComponent } from './letter-by-date/letter-by-date.component';

import { ChartModule,AccumulationChartModule   } from '@syncfusion/ej2-angular-charts';
import {PieSeriesService,ExportService, AccumulationTooltipService, AccumulationDataLabelService, CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService, DataLabelService,
    StepAreaSeriesService, SplineSeriesService, StripLineService,AccumulationLegendService,
    SelectionService, ScatterSeriesService, ZoomService, AreaSeriesService, RangeAreaSeriesService
 } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    LetterTrackingComponent,
    AddLetterComponent,
    EditLetterComponent,
    SubletterComponent,
    AllLettersComponent,
    CompletedLettersComponent,
    PendingLettersComponent,
    LetterByDateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    ChartModule,
    AccumulationChartModule,
    RouterModule.forChild([
      {path:'', component:LetterTrackingComponent},
      {path:'all-letters', component:AllLettersComponent},
      {path:'add-letter', component:AddLetterComponent},
      {path:'edit-letter', component:EditLetterComponent},
      {path:'sub-letter/:id', component:SubletterComponent},
      {path:'completed', component:CompletedLettersComponent},
      {path:'pending', component:PendingLettersComponent},
      {path:'by-date', component:LetterByDateComponent},
    ])
  ],
  providers: [LineSeriesService,ExportService,StackingColumnSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationLegendService,  AccumulationDataLabelService, SelectionService, ScatterSeriesService, AreaSeriesService, RangeAreaSeriesService ]
})
export class LetterTrackingModuleModule { }
