import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-yojna',
  templateUrl: './yojna.component.html',
  styleUrls: ['./yojna.component.css']
})
export class YojnaComponent implements OnInit {

  myForm1: any;
  Mode = '';
  ModeName = '';
  Journalist = '';
  Date = '';
  Against = '';
  Other = '';
  Status = '';
  Yojna = '';
  Area = '';



  constructor(public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController) { }

  ngOnInit() {
 
  }

  resetForm(){
    this.myForm1.reset();
  }

  async downloadExcel() {
    const toast = await this.toastController.create({
      message: 'Request added to export.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async downloadPDF() {
    const toast = await this.toastController.create({
      message: 'Request added to download doc.',
      duration: 2000,
      position: 'top',
      color: 'primary',
    });
    toast.present();
  }

  async deleteYojna() {
    const alert = await this.alertController.create({
      header: 'Delete योजना ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this योजना',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: 'yes',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ],
    });

    await alert.present();
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
