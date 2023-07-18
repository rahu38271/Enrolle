import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting/setting.component'; 
import { WhatsappSettingComponent } from './whatsapp-setting/whatsapp-setting.component';
import { VoiceSettingComponent } from './voice-setting/voice-setting.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { SmsSettingComponent } from './sms-setting/sms-setting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WhatsappContentComponent } from './whatsapp-content/whatsapp-content.component';


@NgModule({
  declarations: [SettingComponent,SmsSettingComponent,WhatsappSettingComponent,VoiceSettingComponent,EmailSettingComponent, LandingPageComponent, WhatsappContentComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild([
      {path:'', component: SettingComponent},
      {path:'sms-setting', component: SmsSettingComponent},
       {path:'whatsapp-setting', component: WhatsappSettingComponent},
        {path:'voice-setting', component: VoiceSettingComponent},
         {path:'email-setting', component: EmailSettingComponent},
         {path:'landing-image', component: LandingPageComponent},
      {path:'whatsapp-content', component: WhatsappContentComponent},
        ])
  ]
})
export class SettingModuleModule { }
