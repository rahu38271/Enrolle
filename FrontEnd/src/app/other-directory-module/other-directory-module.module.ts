import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { OtherDirectoryComponent } from './other-directory/other-directory.component'
import { AddOtherDirectoryComponent } from './add-other-directory/add-other-directory.component'
import { EditOtherDirectoryComponent } from './edit-other-directory/edit-other-directory.component'
import { ImportOtherDirectoryComponent } from './import-other-directory/import-other-directory.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [OtherDirectoryComponent,AddOtherDirectoryComponent,EditOtherDirectoryComponent,ImportOtherDirectoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:OtherDirectoryComponent},{path:'add-other-directory', component:AddOtherDirectoryComponent},{path:'edit-other-directory', component:EditOtherDirectoryComponent},{path:'import-other-directory', component:ImportOtherDirectoryComponent}])
  ]
})
export class OtherDirectoryModuleModule { }
