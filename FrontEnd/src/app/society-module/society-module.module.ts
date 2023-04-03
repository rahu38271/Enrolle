import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocietyComponent } from './society/society.component';
import { AddSocietyComponent } from './add-society/add-society.component';
import { EditSocietyComponent } from './edit-society/edit-society.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SocietyComponent,
    AddSocietyComponent,
    EditSocietyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild([
      {path:'', component:SocietyComponent},
      {path:'add-society', component:AddSocietyComponent},
      {path:'edit-society', component:EditSocietyComponent}
    ])
  ]
})
export class SocietyModuleModule { }
