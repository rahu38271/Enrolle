import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-upload-mobile-data',
  templateUrl: './upload-mobile-data.component.html',
  styleUrls: ['./upload-mobile-data.component.scss'],
})
export class UploadMobileDataComponent implements OnInit {

  seniorityHeader:any = {
    header: 'ज्येष्ठता'
  };
  areaHeader:any = {
    header: ' एरिया नाव'
  }
  GenderHeader:any = {
    header: 'Select Gender'
  };
  BoothHeader: any = {
    header: 'Select Booth '
  }

  myForm;
  Name = '';
  Address = '';
  Email = '';
  Mobile = '';
  PinCode = '';
  Booth = '';
  Gender = '';
  VoterID = '';
  date = '';
  age = '';
  seniority = '';
  area = '';
  occupation = '';
  bloodgroup = '';
  mobile = '';
  whatsapp = '';
  radio1 = '';
  radio2 = '';
  info = '';
  
  constructor(public loadingController: LoadingController) { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Uploading...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
