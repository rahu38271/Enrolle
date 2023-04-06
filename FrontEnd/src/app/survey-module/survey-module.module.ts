import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SurveyListComponent } from './survey-list/survey-list.component'
import { AddSurveyComponent } from './add-survey/add-survey.component'
import { AddVillageComponent } from './add-village/add-village.component'
import { EditSurveyComponent } from './edit-survey/edit-survey.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SurveyListComponent,AddSurveyComponent, EditSurveyComponent,AddVillageComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([{path:'', component:SurveyListComponent},{path:'add-survey', component:AddSurveyComponent},{path:'edit-survey', component:EditSurveyComponent},{path:'add-village', component:AddVillageComponent}])
  ]
})
export class SurveyModuleModule { }
