import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service'
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';



@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  getContacts:any;

  constructor
  (
    public toastController: ToastController,
    public loadingController: LoadingController, 
    private contact:ContactService, 
    private alertController: AlertController, 
    private router:Router, 
    private loader:LoaderService, 
    private toast:IonicToastService
    ) 
   { 
    this.loader.showLoading();
    this.contact.getContacts().subscribe(data=>{
      this.loader.hideLoader();
      if(data != 0){
        this.getContacts = data;
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    })
  }

  ngOnInit() {
    
  }

  async deleteContact() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Delete Contact !',
      message: 'Are you sure, you want to delete this contact',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          id: 'confirm-button',
          cssClass: 'yes',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
