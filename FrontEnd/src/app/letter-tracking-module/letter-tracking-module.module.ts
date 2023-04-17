import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterTrackingComponent } from './letter-tracking/letter-tracking.component';
import { AddLetterComponent } from './add-letter/add-letter.component';
import { EditLetterComponent } from './edit-letter/edit-letter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubletterComponent } from './subletter/subletter.component';


@NgModule({
  declarations: [
    LetterTrackingComponent,
    AddLetterComponent,
    EditLetterComponent,
    SubletterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild([
      {path:'', component:LetterTrackingComponent},
      {path:'add-letter', component:AddLetterComponent},
      {path:'edit-letter', component:EditLetterComponent},
      {path:'sub-letter', component:SubletterComponent},
    ])
  ]
})
export class LetterTrackingModuleModule { }
