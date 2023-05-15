import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule,Ng2SearchPipe } from 'ng2-search-filter';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ContactComponent,AddContactComponent,ImportContactComponent,EditContactComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forChild([{path:'', component:ContactComponent}, { path:'add-contact', component:AddContactComponent}, {path:'import-contact', component:ImportContactComponent},{path:'edit-contact', component:EditContactComponent}])
  ],
  exports: [ RouterModule ],
  bootstrap: [ ContactComponent ],
  providers:[Ng2SearchPipe]
})
export class ContactModuleModule { }
