import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;

  constructor(private loadingCtrl: LoadingController) { }

  async showLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message: 'Please wait',
      //spinner: 'circles',
      cssClass: 'custom-loading'
    }).then(a => {
      a.present().then(() => {
        console.log('');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log(''));
        }
      });
    });
    
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log(''));
  }
}