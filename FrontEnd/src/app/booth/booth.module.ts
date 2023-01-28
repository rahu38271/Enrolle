import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoothPageRoutingModule } from './booth-routing.module';

import { BoothPage } from './booth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoothPageRoutingModule
  ],
  declarations: [BoothPage]
})
export class BoothPageModule {}
