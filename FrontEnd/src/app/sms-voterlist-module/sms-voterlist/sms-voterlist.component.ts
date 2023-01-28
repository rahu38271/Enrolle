import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sms-voterlist',
  templateUrl: './sms-voterlist.component.html',
  styleUrls: ['./sms-voterlist.component.scss'],
})
export class SmsVoterlistComponent implements OnInit {

  mode:any = {
    header: 'माध्यम '
  }

  modeType:any = {
    header: 'माध्यमाचे नाव'
  }

  RouteHeader: any = {
    header: 'Select Route'
  }

  SenderIDHeader: any = { 
    header: 'Sender ID'
  }

  GroupDHeader:any = {
    header: 'Select MobileData Group'
  }

  TemplateHeader:any = {
    header: 'Select SMS Template'
  }

  myForm;
  Route = '';
  SenderID = '';
  Group = '';
  subject = '';
  link = '';
  reporter = '';
  mobile = '';
  whatsapp = '';
  radio = '';
  radio2 = '';
  Numbers = '';
  Template = '';
  Characters = '';



  constructor(public loadingController: LoadingController) { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Sending SMS...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
