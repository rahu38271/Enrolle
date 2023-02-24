import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { OfficeDirectoryComponent } from './office-directory/office-directory.component'
import { AddOfficerComponent } from './add-officer/add-officer.component'
import { EditOfficerComponent } from './edit-officer/edit-officer.component'
import { ImportOfficerComponent } from './import-officer/import-officer.component'

import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [OfficeDirectoryComponent,AddOfficerComponent,EditOfficerComponent,ImportOfficerComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:OfficeDirectoryComponent}, {path:'add-officer', component:AddOfficerComponent}, {path:'edit-officer', component:EditOfficerComponent}, {path:'import-officer', component:ImportOfficerComponent}])
  ]
})
export class OfficerDirectoryModuleModule { }
