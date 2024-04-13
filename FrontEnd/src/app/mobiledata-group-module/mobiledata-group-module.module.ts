import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MobiledataGroupComponent } from './mobiledata-group/mobiledata-group.component'
import { AddMobiledataGroupComponent } from './add-mobiledata-group/add-mobiledata-group.component'
import { UploadMobiledataGroupComponent } from './upload-mobiledata-group/upload-mobiledata-group.component'

@NgModule({
  declarations: [MobiledataGroupComponent,AddMobiledataGroupComponent,UploadMobiledataGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path:'', component:MobiledataGroupComponent},{path:'add-mobiledata-group', component:AddMobiledataGroupComponent},{path:'upload-mobiledata-group', component:UploadMobiledataGroupComponent}])
  ]
})
export class MobiledataGroupModuleModule { }
