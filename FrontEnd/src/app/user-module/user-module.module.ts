import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component'
import { ViewUserComponent } from './view-user/view-user.component'
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user/user.component';
import { AccountComponent } from './account/account.component';
import { UserSettingComponent } from './user-setting/user-setting.component'
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssignDataComponent } from './assign-data/assign-data.component';

@NgModule({
  declarations: [ViewUserComponent,AddUserComponent,EditUserComponent,UserComponent,AccountComponent, UserSettingComponent, AssignDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:UserComponent}, {path:'addUser', component:AddUserComponent}, {path:'edit-user/:id', component:EditUserComponent},{path:'view-user', component:ViewUserComponent},  {path:'account/:id', component:AccountComponent}, {path:'setting', component:UserSettingComponent}, {path:'assign-data/:id', component:AssignDataComponent}])
  ]
})
export class UserModuleModule { }
