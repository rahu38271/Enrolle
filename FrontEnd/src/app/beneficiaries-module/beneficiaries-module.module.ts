import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import {RouterModule } from '@angular/router'
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component'
import { AddBeneficiariesComponent} from './add-beneficiaries/add-beneficiaries.component'
import { EditBeneficiariesComponent} from './edit-beneficiaries/edit-beneficiaries.component'
import { ImportBeneficiariesComponent } from './import-beneficiaries/import-beneficiaries.component'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [BeneficiariesComponent,AddBeneficiariesComponent,EditBeneficiariesComponent,ImportBeneficiariesComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:BeneficiariesComponent}, { path:'add-beneficiaries', component:AddBeneficiariesComponent}, {path:'edit-beneficiaries', component:EditBeneficiariesComponent}, {path:'import-beneficiaries', component:ImportBeneficiariesComponent}])
  ]
})
export class BeneficiariesModuleModule { }
