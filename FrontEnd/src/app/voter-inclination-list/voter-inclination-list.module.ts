import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoterInclinationListPageRoutingModule } from './voter-inclination-list-routing.module';

import { VoterInclinationListPage } from './voter-inclination-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoterInclinationListPageRoutingModule,
  ],
  declarations: [VoterInclinationListPage]
})
export class VoterInclinationListPageModule {}
