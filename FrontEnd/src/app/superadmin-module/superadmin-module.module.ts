import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddSuperadminComponent } from './add-superadmin/add-superadmin.component';
import { EditSuperadminComponent } from './edit-superadmin/edit-superadmin.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { AccountComponent } from './account/account.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssignDataComponent } from './assign-data/assign-data.component';
import { DbComponent } from './db/db.component';

@NgModule({
  declarations: [
    SuperadminComponent,
    AddSuperadminComponent,
    EditSuperadminComponent,
    AccountComponent,
    AssignDataComponent,
    DbComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgSelectModule,
    RouterModule.forChild([
      {path:'', component:SuperadminComponent}, 
      {path:'add-superadmin', component:AddSuperadminComponent}, 
      {path:'edit-superadmin', component:EditSuperadminComponent}, 
      {path:'account/:id', component:AccountComponent},
      {path:'assign-data/:id/:partNoAssigned',component:AssignDataComponent},
      {path:'db/:id', component:DbComponent}
    ])
  ]
})
export class SuperadminModuleModule { }
