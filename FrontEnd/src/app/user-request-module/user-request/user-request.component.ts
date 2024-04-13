import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
})
export class UserRequestComponent implements OnInit {

  myForm1: any;
  Mode = '';
  Status = '';
  tableName = '';

  mode: any = {
    header: 'माध्यम'
  };

  modeName: any = {
    header: ' माध्यमाचे नाव'
  };

  StatusHeader:any = {
    header: 'select Status'
  }


  constructor(public alertController: AlertController,public loadingController: LoadingController) { }

  resetForm(){
    this.myForm1.reset();
  }

  ngOnInit() { 

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Searching...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
