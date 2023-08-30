import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule} from '@angular/forms'
import {RouterModule } from '@angular/router'
import {MobileMatchComponent } from './mobile-match/mobile-match.component'
import { HttpClientModule } from '@angular/common/http';
import { ImportComponent } from './import/import.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [MobileMatchComponent, ImportComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forChild([
      {path:'', component:MobileMatchComponent},
      {path:'import', component:ImportComponent}
    ])
  ]
})
export class MobileMatchModuleModule { }
