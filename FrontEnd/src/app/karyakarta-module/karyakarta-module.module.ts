import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { KaryakartaComponent} from './karyakarta/karyakarta.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { AddKaryakartaComponent } from './add-karyakarta/add-karyakarta.component'
import { EditKaryakartaComponent } from './edit-karyakarta/edit-karyakarta.component'
import {ImportKaryakartaComponent } from './import-karyakarta/import-karyakarta.component'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [KaryakartaComponent,AddKaryakartaComponent,EditKaryakartaComponent,ImportKaryakartaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:KaryakartaComponent}, {path:'add-karyakarta', component:AddKaryakartaComponent},{path:'edit-karyakarta', component:EditKaryakartaComponent},{path:'import-karyakarta', component:ImportKaryakartaComponent}])
  ]
})
export class KaryakartaModuleModule { }
