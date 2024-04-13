import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssignMobiledataComponent} from './assign-mobiledata/assign-mobiledata.component'

@NgModule({
  declarations: [AssignMobiledataComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:AssignMobiledataComponent}])
  ]
})
export class AssignMobiledataModuleModule { }
