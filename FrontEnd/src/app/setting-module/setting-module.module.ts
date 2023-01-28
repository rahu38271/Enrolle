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



@NgModule({
  declarations: [SettingComponent,SmsSettingComponent,WhatsappSettingComponent,VoiceSettingComponent,EmailSettingComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{path:'', component: SettingComponent},{path:'sms-setting', component: SmsSettingComponent}, {path:'whatsapp-setting', component: WhatsappSettingComponent}, {path:'voice-setting', component: VoiceSettingComponent}, {path:'email-setting', component: EmailSettingComponent}])
  ]
})
export class SettingModuleModule { }
