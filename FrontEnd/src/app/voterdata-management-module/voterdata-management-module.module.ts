import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import {RouterModule } from '@angular/router'
import { VoterdataManagementComponent} from './voterdata-management/voterdata-management.component'
import { EditVoterdataComponent } from './edit-voterdata/edit-voterdata.component'
import { AddVoterComponent } from './add-voter/add-voter.component'
import { ImportVoterdataComponent } from './import-voterdata/import-voterdata.component'
import { VoterDetailsComponent } from './voter-details/voter-details.component'
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FamilyComponent } from './family/family.component';
import { VoterbyUserComponent } from './voterby-user/voterby-user.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { VoterInfoComponent } from './voter-info/voter-info.component';


@NgModule({
  declarations: [VoterdataManagementComponent,EditVoterdataComponent,AddVoterComponent,ImportVoterdataComponent,VoterDetailsComponent, FamilyComponent, VoterbyUserComponent, VoterInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    HttpClientModule,
    TranslateModule,
    NgxPaginationModule,
    RouterModule.forChild([{
        path:'', component:VoterdataManagementComponent},
        {path:'edit-voterdata', component:EditVoterdataComponent},
        {path:'add-voter', component:AddVoterComponent},
        {path:'import-voter', component:ImportVoterdataComponent},
        //{path:'voter-details', component:VoterDetailsComponent},  
        {path:'voter-details/:id', component:VoterDetailsComponent}, 
        {path:'voter-info/:id', component:VoterInfoComponent},  
        
        {path:'family', component:FamilyComponent}, 
        {path:'voterby-user', component:VoterbyUserComponent} ])
  ],
  providers: [SocialSharing],
})
export class VoterdataManagementModuleModule { }
