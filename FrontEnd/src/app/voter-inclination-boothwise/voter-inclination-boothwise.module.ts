import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoterInclinationBoothwisePageRoutingModule } from './voter-inclination-boothwise-routing.module';

import { VoterInclinationBoothwisePage } from './voter-inclination-boothwise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoterInclinationBoothwisePageRoutingModule
  ],
  declarations: [VoterInclinationBoothwisePage]
})
export class VoterInclinationBoothwisePageModule {}
