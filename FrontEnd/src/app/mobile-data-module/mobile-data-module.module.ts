import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { MobileDataComponent } from './mobile-data/mobile-data.component'
import { AddMobileDataComponent} from './add-mobile-data/add-mobile-data.component'
import { UploadMobileDataComponent} from './upload-mobile-data/upload-mobile-data.component'

@NgModule({
  declarations: [MobileDataComponent,AddMobileDataComponent,UploadMobileDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component:MobileDataComponent}, { path:'add-mobiledata', component:AddMobileDataComponent}, { path:'upload-mobiledata', component:UploadMobileDataComponent}]) 
  ]
})
export class MobileDataModuleModule { }
