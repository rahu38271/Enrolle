import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocietyComponent } from './society/society.component';
import { AddSocietyComponent } from './add-society/add-society.component';
import { EditSocietyComponent } from './edit-society/edit-society.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SocietyDetailsComponent } from './society-details/society-details.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    SocietyComponent,
    AddSocietyComponent,
    EditSocietyComponent,
    SocietyDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([
      {path:'', component:SocietyComponent},
      {path:'add-society', component:AddSocietyComponent},
      {path:'edit-society', component:EditSocietyComponent},
      {path:'society-details', component:EditSocietyComponent}
    ])
  ]
})
export class SocietyModuleModule { }
