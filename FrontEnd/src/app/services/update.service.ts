import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, Platform } from '@ionic/angular';
import { VersionService } from './version.service';
import { Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class update {

  url = environment.apiUrl;
  versionInfo: any;
  newVersion: any;
  installedversion: any;


  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private platform: Platform,
    private versionService: VersionService,
    private router: Router,
    private appVersion: AppVersion
  ) {


  }





  checkForUpdates() {
    debugger;
    this.versionService.getandroidVersion().subscribe(data => {
      if (data) {
        this.versionInfo = data;
        var info = {
          newVersion: data[0].newVersion,
          msg: {
            title: 'App update',
            msg: 'Update Matadarmaza',
            btn: 'Update'
          }
        }
        /// var newVersion = "1.0.26";
        var newVersion = data[0].newVersion;
        //var newVersionNumber = parseFloat(newVersion.replace(/\./g, ""));
        
        if (newVersion == this.installedversion) {
          this.hideAlert();
          this.router.navigate(['/mobile-dashboard']);
        }
        else if (newVersion > this.installedversion) {
          this.presentalrt(info.msg.title, info.msg.msg, info.msg.btn);
        }
        else {
          this.hideAlert();
          this.router.navigate(['/mobile-dashboard']);
        }
        // console.log("new version is" +" "+ newVersionNumber);
        // console.log("installed version is" +" "+ installedversionNumber);
        //data[0].installedversion;
        // this.platform.is('android')
        // if (this.platform.is('android')) {
        //   if (newVersionNumber > installedversionNumber) {
        //     this.presentalrt(info.msg.title, info.msg.msg, info.msg.btn);
        //   }
        //   else if (newVersionNumber == installedversionNumber) {
        //     this.hideAlert();
        //     this.router.navigate(['/mobile-dashboard']);
        //   }
        // }

      }
    })
  }

  async presentalrt(header, message, buttonText = '', allowClose = false) {
    const buttons = []
    if (buttonText != '') {
      buttons.push({
        text: buttonText, handler: () => {
          this.openAppStoreEntry1()
        }
      })
    }
    if (allowClose) {
      buttons.push({ text: 'Close', role: 'Cancel' })
    }
    const alert = await this.alertController.create({
      header,
      message,
      buttons, backdropDismiss: allowClose
    })
    await alert.present();
  }


  async hideAlert() {
    const alert = await this.alertController.getTop();
    if (alert) {
      await alert.dismiss(); // Dismiss the alert if it exists
    }
  }



  //  openAppStoreEntry1()
  //  {
  //    if(this.platform.is('android'))
  //    {
  //      window.open("https://play.google.com/store/apps/details?id=io.ionic.pollmaster","_system")// matadarmaza prod
  //    }
  //  }

  openAppStoreEntry1() {
    window.open("https://play.google.com/store/apps/details?id=io.ionic.pollmaster", "_system")// matadarmaza prod
  }


}
