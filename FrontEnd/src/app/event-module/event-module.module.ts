import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddPdfSettingComponent } from './add-pdf-setting/add-pdf-setting.component';
import { EditPdfSettingComponent } from './edit-pdf-setting/edit-pdf-setting.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [EventComponent, AddEventComponent, EditEventComponent, EventDetailsComponent, AddPdfSettingComponent, EditPdfSettingComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxDropzoneModule,
    RouterModule.forChild([{path:'', component: EventComponent}, {path:'add-event', component: AddEventComponent}, {path:'edit-event', component: EditEventComponent}, {path:'event-details', component: EventDetailsComponent},{path:'add-pdf-setting', component: AddPdfSettingComponent}, {path:'edit-pdf-setting', component: EditPdfSettingComponent} ])
  ]
})
export class EventModuleModule { }
