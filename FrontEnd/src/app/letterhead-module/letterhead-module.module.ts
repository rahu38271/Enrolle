import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LetterheadComponent } from './letterhead/letterhead.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditLetterheadComponent } from './edit-letterhead/edit-letterhead.component';

@NgModule({
  declarations: [LetterheadComponent, EditLetterheadComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgxDropzoneModule,
    RouterModule.forChild([{path:'', component: LetterheadComponent}, {path:'edit-letterhead', component: EditLetterheadComponent}])

  ]
})
export class LetterheadModuleModule { }
