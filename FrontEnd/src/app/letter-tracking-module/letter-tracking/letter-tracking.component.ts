import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-letter-tracking',
  templateUrl: './letter-tracking.component.html',
  styleUrls: ['./letter-tracking.component.css']
})
export class LetterTrackingComponent implements OnInit {

  constructor(
    public alertController: AlertController,
  ) { }

  ngOnInit(): void {
  }

  async deleteLetter() {
    const alert = await this.alertController.create({
      header: 'Delete Letter',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Letter',
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
            
          }
        }
      ],
    });

    await alert.present();
  }

}
