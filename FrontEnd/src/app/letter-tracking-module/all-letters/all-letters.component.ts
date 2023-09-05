import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-letters',
  templateUrl: './all-letters.component.html',
  styleUrls: ['./all-letters.component.css']
})
export class AllLettersComponent implements OnInit {

  constructor(
    public alertController: AlertController,
    private location:Location,
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

  goBack(){
    this.location.back();
  }

}
