import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';
import { BoothService } from 'src/app/services/booth.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-booth',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.css']
})
export class BoothComponent implements OnInit {

  isShow = false;

  currentDate = new Date();
  getBoothData: any;

  search(){
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController,
      public toastController: ToastController,
      public loadingController: LoadingController,
      private booth:BoothService,
      private loader:LoaderService,
      private router:Router
    ) 
    {
      this.booth.getBoothData().subscribe(data=>{
        this.loader.showLoading();
        if(data){
          console.log(data);
          this.loader.hideLoader();
          this.getBoothData = data;
        }
      })

     }

     EditBooth(data:any){
      this.router.navigateByUrl('/Booth/edit-booth', {state:data});
     }

  ngOnInit(): void {
  }

  async deleteBooth() {
    const alert = await this.alertController.create({
      header: ' Delete Booth ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this booth ?',
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
