import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular'
import { FormsModule} from '@angular/forms'
import { RouterModule} from '@angular/router'
import { DocumentRepositoryComponent } from './document-repository/document-repository.component'
import {AddDocumentRepositoryComponent } from './add-document-repository/add-document-repository.component'
import {EditDocumentRepositoryComponent } from './edit-document-repository/edit-document-repository.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [DocumentRepositoryComponent,AddDocumentRepositoryComponent,EditDocumentRepositoryComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component: DocumentRepositoryComponent}, {path:'add-document-repository', component:AddDocumentRepositoryComponent }, {path:'edit-document-repository', component:EditDocumentRepositoryComponent}])
  ]
})
export class DocumentRepositoryModuleModule { }
