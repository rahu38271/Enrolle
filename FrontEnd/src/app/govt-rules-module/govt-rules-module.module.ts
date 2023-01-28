import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms'
import {GovtRulesComponent } from './govt-rules/govt-rules.component'
import { AddGovtRulesComponent } from './add-govt-rules/add-govt-rules.component'
import {EditGovtRulesComponent } from './edit-govt-rules/edit-govt-rules.component'
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [GovtRulesComponent,AddGovtRulesComponent,EditGovtRulesComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:GovtRulesComponent},{path:'add-govt-rules', component:AddGovtRulesComponent},{path:'edit-govt-rules',component:EditGovtRulesComponent}])
  ]
})
export class GovtRulesModuleModule { }
