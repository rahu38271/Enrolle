import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule} from '@angular/forms'
import {RouterModule } from '@angular/router'
import {MobileMatchComponent } from './mobile-match/mobile-match.component'
import { HttpClientModule } from '@angular/common/http';
import { ImportComponent } from './import/import.component';

@NgModule({
  declarations: [MobileMatchComponent, ImportComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'', component:MobileMatchComponent},
      {path:'import', component:ImportComponent}
    ])
  ]
})
export class MobileMatchModuleModule { }
