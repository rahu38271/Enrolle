import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router'
import { PressNoteComponent} from './press-note/press-note.component'
import {AddPressNoteComponent } from './add-press-note/add-press-note.component'
import {EditPressNoteComponent } from './edit-press-note/edit-press-note.component'
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [PressNoteComponent,AddPressNoteComponent,EditPressNoteComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component: PressNoteComponent}, {path:'add-press-note', component:AddPressNoteComponent},{path:'edit-press-note', component: EditPressNoteComponent}])
  ]
})
export class PressNoteModuleModule { }
