import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { BoothCoordinatorComponent } from './booth-coordinator/booth-coordinator.component'
import { AddBoothCoordinatorComponent} from './add-booth-coordinator/add-booth-coordinator.component'
import { EditBoothCoordinatorComponent} from './edit-booth-coordinator/edit-booth-coordinator.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [BoothCoordinatorComponent,AddBoothCoordinatorComponent,EditBoothCoordinatorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([{path:'', component:BoothCoordinatorComponent},{path:'add-booth-coordinator', component:AddBoothCoordinatorComponent},{path:'edit-booth-coordinator', component:EditBoothCoordinatorComponent}])
  ]
})
export class BoothCoordinatorModuleModule { }
