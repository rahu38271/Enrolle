import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule} from '@angular/router'
import { IonicModule } from '@ionic/angular'
import {FormsModule } from '@angular/forms'
import {JournalistComponent } from './journalist/journalist.component'
import {AddJournalistComponent } from './add-journalist/add-journalist.component'
import {EditJournalistComponent } from './edit-journalist/edit-journalist.component'

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [JournalistComponent,AddJournalistComponent,EditJournalistComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:JournalistComponent},{path:'add-journalist', component:AddJournalistComponent },{path:'edit-journalist', component:EditJournalistComponent}])
  ]
})
export class JournalistModuleModule { }
