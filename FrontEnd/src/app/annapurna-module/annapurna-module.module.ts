import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnapurnaComponent } from './annapurna/annapurna.component';
import { AddAnnapurnaComponent } from './add-annapurna/add-annapurna.component';
import { EditAnnapurnaComponent } from './edit-annapurna/edit-annapurna.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule} from 'ngx-pagination';
import { ReportComponent } from './report/report.component';
import { BeneficiaryReportComponent } from './beneficiary-report/beneficiary-report.component';

@NgModule({
  declarations: [
    AnnapurnaComponent,
    AddAnnapurnaComponent,
    EditAnnapurnaComponent,
    ReportComponent,
    BeneficiaryReportComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'', component:AnnapurnaComponent},
      {path:'add-annapurna', component:AddAnnapurnaComponent},
      {path:'edit-annapurna', component:EditAnnapurnaComponent},
      {path:'report', component:ReportComponent},
      {path:'beneficiary-report', component:BeneficiaryReportComponent}
      
    ])
  ]
})
export class AnnapurnaModuleModule { }
