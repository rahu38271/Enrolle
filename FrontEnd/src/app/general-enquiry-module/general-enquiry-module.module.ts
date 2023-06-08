import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralEnquiryComponent } from './general-enquiry/general-enquiry.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddEnquiryComponent } from './add-enquiry/add-enquiry.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditEnquiryComponent } from './edit-enquiry/edit-enquiry.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    GeneralEnquiryComponent,
    AddEnquiryComponent,
    EditEnquiryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'', component:GeneralEnquiryComponent},
      {path:'add-enquiry', component:AddEnquiryComponent},
      {path:'edit-enquiry', component:EditEnquiryComponent},
    ])
  ]
})
export class GeneralEnquiryModuleModule { }
