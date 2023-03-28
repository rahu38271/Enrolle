import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import {FormsModule } from '@angular/forms'
import { RouterModule} from '@angular/router'
import { VoterSummaryComponent} from './voter-summary/voter-summary.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [VoterSummaryComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([{path:'', component:VoterSummaryComponent}])
  ]
})
export class VoterSummaryModuleModule { }
