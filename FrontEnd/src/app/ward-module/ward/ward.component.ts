import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {

  isShow = false;
  getWardData: any;

  search(){
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController,
      private loader:LoaderService,
      private ward:WardService
    ) 
    {
      
     }

     wardList(){
      this.ward.getWardData().subscribe(data=>{
        console.log(data);
        this.getWardData = data;
      })
     }

  ngOnInit(): void {
    this.wardList();
  }

  async deleteWard() {
    const alert = await this.alertController.create({
      header: ' Delete Ward ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this ward ?',
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

}
