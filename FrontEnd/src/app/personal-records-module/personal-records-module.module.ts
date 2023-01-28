import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular'
import {FormsModule } from '@angular/forms' 
import { RouterModule} from '@angular/router'
import { PersonalRecordsComponent } from './personal-records/personal-records.component'
import { AddPersonalRecordsComponent } from './add-personal-records/add-personal-records.component'
import {EditPersonalRecordsComponent } from './edit-personal-records/edit-personal-records.component'
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [PersonalRecordsComponent,AddPersonalRecordsComponent,EditPersonalRecordsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:PersonalRecordsComponent},{path:'add-personal-records',component:AddPersonalRecordsComponent},{path:'edit-personal-records',component:EditPersonalRecordsComponent}])
  ]
})
export class PersonalRecordsModuleModule { }
