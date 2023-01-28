import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class IonicToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(msg:any, cls:any, icon:any) {
    const toast = await this.toastController.create({
      message: msg,
      color: cls,
      icon: icon,
      duration: 2000,
      position: 'top',
      cssClass: 'toastAfterHeader'
    });
    toast.present();
  }

}
