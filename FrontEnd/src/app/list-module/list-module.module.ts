import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component'
import { ByVillageComponent } from './by-village/by-village.component'
import { VillagewiseListComponent } from './villagewise-list/villagewise-list.component'
import { ModernWayComponent } from './modern-way/modern-way.component'
import { ListwiseComponent } from './listwise/listwise.component'
import { BySurnameComponent } from './by-surname/by-surname.component'
import { SurnamewiseListComponent } from './surnamewise-list/surnamewise-list.component'
import { ByBoothComponent } from './by-booth/by-booth.component'
import { BoothwiseListComponent } from './boothwise-list/boothwise-list.component'
import { ByListComponent } from './by-list/by-list.component'
import {  ListwiseListComponent} from './listwise-list/listwise-list.component'
import { AgewiseListComponent } from './agewise-list/agewise-list.component'
import {ByCastComponent } from './by-cast/by-cast.component'
import {CastwiseListComponent } from './castwise-list/castwise-list.component'
import { ByAlphabetComponent } from './by-alphabet/by-alphabet.component';
import { AlphabetwiseListComponent } from './alphabetwise-list/alphabetwise-list.component';
import { ByAddressComponent } from './by-address/by-address.component';
import { AddresswiseListComponent } from './addresswise-list/addresswise-list.component';
import { VotedComponent } from './voted/voted.component';
import { ByProfessionComponent } from './by-profession/by-profession.component';
import { ProfessionwiseListComponent } from './professionwise-list/professionwise-list.component';
import { ByPincodeComponent } from './by-pincode/by-pincode.component';
import { PincodewiseListComponent } from './pincodewise-list/pincodewise-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MobileListComponent } from './mobile-list/mobile-list.component';
import { ImpVoterComponent } from './imp-voter/imp-voter.component';
import { ByColorComponent } from './by-color/by-color.component';
import { ColorwiseListComponent } from './colorwise-list/colorwise-list.component';
import { SupporterListComponent } from './supporter-list/supporter-list.component';
import { OppositionListComponent } from './opposition-list/opposition-list.component';
import { DoubtfulListComponent } from './doubtful-list/doubtful-list.component';
import { OtherListComponent } from './other-list/other-list.component';
import { ByDeathComponent } from './by-death/by-death.component';
import { VotedvoterComponent } from './votedvoter/votedvoter.component';
import { NotvotedvoterComponent } from './notvotedvoter/notvotedvoter.component';
import { AlivevoterComponent } from './alivevoter/alivevoter.component';
import { DeadvoterComponent } from './deadvoter/deadvoter.component';
import { TranslateModule } from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BySocietyComponent } from './by-society/by-society.component';
import { SocietywiseListComponent } from './societywise-list/societywise-list.component';
import { ChartModule, ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import {
  LineSeriesService,RangeColumnSeriesService, DataLabelService, StackingColumnSeriesService, CategoryService,
  StepAreaSeriesService, SplineSeriesService, ScrollBarService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
  SelectionService, ScatterSeriesService, ZoomService, ColumnSeriesService, AreaSeriesService, RangeAreaSeriesService
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    ListComponent,
    ByVillageComponent,
    VillagewiseListComponent,
    ModernWayComponent,
    ListwiseComponent,
    BySurnameComponent,
    SurnamewiseListComponent,
    ByBoothComponent,
    BoothwiseListComponent,
    ByListComponent,
    ListwiseListComponent,
    AgewiseListComponent,
    ByCastComponent,
    CastwiseListComponent, 
    ByAlphabetComponent, 
    AlphabetwiseListComponent,
    ByAlphabetComponent, 
    ByAddressComponent, 
    AddresswiseListComponent, 
    VotedComponent, 
    ByProfessionComponent, 
    ProfessionwiseListComponent, 
    ByPincodeComponent, 
    PincodewiseListComponent, 
    MobileListComponent, 
    ImpVoterComponent, 
    ByColorComponent, 
    ColorwiseListComponent, 
    SupporterListComponent, 
    OppositionListComponent, 
    DoubtfulListComponent, 
    OtherListComponent, 
    ByDeathComponent, 
    VotedvoterComponent, 
    NotvotedvoterComponent, 
    AlivevoterComponent, 
    DeadvoterComponent, BySocietyComponent, SocietywiseListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgSelectModule,
    ChartModule,
    ChartAllModule, AccumulationChartAllModule, AccumulationChartModule, 
    RouterModule.forChild([
      {path:'', component:ListComponent}, 
      {path:'by-village', component:ByVillageComponent},
      {path:'villagewise-list/:id', component:VillagewiseListComponent},
      {path:'modern-way', component:ModernWayComponent},
      {path:'listwise', component:ListwiseComponent},
      {path:'by-surname', component:BySurnameComponent},
      {path:'surnamewise-list/:columnName', component:SurnamewiseListComponent},
      {path:'by-booth', component:ByBoothComponent},
      {path:'boothwise-list', component:BoothwiseListComponent},
      {path:'by-list', component:ByListComponent},
      {path:'listwise-list', component:ListwiseListComponent},
      {path:'agewise-list', component:AgewiseListComponent},
      {path:'by-cast', component:ByCastComponent}, 
      {path:'castwise-list', component:CastwiseListComponent}, 
      {path:'by-alphabet', component:ByAlphabetComponent}, 
      {path:'alphabetwise-list', component:AlphabetwiseListComponent}, 
      {path:'by-village', component:ByVillageComponent},
      {path:'villagewise-list', component:VillagewiseListComponent},
      {path:'modern-way', component:ModernWayComponent},
      {path:'listwise', component:ListwiseComponent},
      {path:'by-surname', component:BySurnameComponent},
      {path:'surnamewise-list', component:SurnamewiseListComponent},
      {path:'by-booth', component:ByBoothComponent},
      {path:'boothwise-list', component:BoothwiseListComponent},
      {path:'by-list', component:ByListComponent},
      {path:'listwise-list', component:ListwiseListComponent},
      {path:'agewise-list', component:AgewiseListComponent},
      {path:'by-cast', component:ByCastComponent}, 
      {path:'castwise-list', component:CastwiseListComponent}, 
      {path:'by-alphabet', component:ByAlphabetComponent}, 
      {path:'by-village', component:ByVillageComponent},
      {path:'villagewise-list', component:VillagewiseListComponent},
      {path:'modern-way', component:ModernWayComponent},
      {path:'listwise', component:ListwiseComponent},
      {path:'by-surname', component:BySurnameComponent},
      {path:'surnamewise-list', component:SurnamewiseListComponent},
      {path:'by-booth', component:ByBoothComponent},
      {path:'boothwise-list', component:BoothwiseListComponent},
      {path:'by-list', component:ByListComponent},
      {path:'listwise-list', component:ListwiseListComponent},
      {path:'agewise-list', component:AgewiseListComponent},
      {path:'by-cast', component:ByCastComponent}, 
      {path:'castwise-list', component:CastwiseListComponent}, 
      {path:'by-alphabet', component:ByAlphabetComponent}, 
      {path:'by-address', component:ByAddressComponent}, 
      {path:'addresswise-list', component:AddresswiseListComponent}, 
      {path:'voted-list', component:VotedComponent}, 
      {path:'by-profession', component:ByProfessionComponent}, 
      {path:'professionwise-list', component:ProfessionwiseListComponent}, 
      {path:'by-pincode', component:ByPincodeComponent}, 
      {path:'pincodewise-list', component:PincodewiseListComponent}, 
      {path:'mobile-list', component:MobileListComponent},
      {path:'imp-voter', component:ImpVoterComponent},
      {path:'by-color', component:ByColorComponent},
      {path:'supporter', component:SupporterListComponent},
      {path:'opposition', component:OppositionListComponent},
      {path:'doubtful', component:DoubtfulListComponent},
      {path:'other', component:OtherListComponent},
      {path:'colorwise-list', component:ColorwiseListComponent},
      {path:'by-death', component:ByDeathComponent},
      {path:'alive', component:AlivevoterComponent},
      {path:'dead', component:DeadvoterComponent},
      {path:'voted-voter', component:VotedvoterComponent},
      {path:'notVoted-voter', component:NotvotedvoterComponent},
      {path:'by-society', component:BySocietyComponent},
      {path:'societywise-list', component:SocietywiseListComponent}
   ])
  ],

})
export class ListModuleModule { }
