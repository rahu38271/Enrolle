import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController,Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';

// interface apiData {
//     Vid:any,
//     InstalledVesion:'',
//     newVersion:'',
//     newVersionDate:''
// }
//apiData:any[];

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  url = environment.apiUrl;
  versionNumber:any;
  versionData:any;
  newVersion:any;

  constructor(
    private http:HttpClient,
    private alertController:AlertController,
    private plt:Platform,
    private appVersion:AppVersion
  ) { }

  // async checkForUpdates(){
  //   this.appVersion.getVersionNumber().then(value=>{
  //     this.versionNumber = value;
  //   }).catch(err =>{
  //     alert(err);
  //   })
  //   this.http.get<any>(this.url+'Version/GetAllVersion').subscribe(async (data:apiData)=>{
  //     var info = {
  //       newVersion : data.newVersion,
  //       Iosversion: data.InstalledVesion,
  //       msg:{
  //         title:'App update',
  //         msg:'Update Matadarmaza',
  //         btn:'Update'
  //       }
  //     }
  //     var re = /./gi;
  //         const splitVersion:number = +this.versionNumber.split('.').join('');
  //         const serverVersion:number = +info.newVersion.split('.').join('');
  //         const iosnewversion:number = +info.Iosversion.split('.').join('');
  //         if(this.plt.is('android'))
  //         {
  //         if(serverVersion> splitVersion)
  //         {
  //           this.presentalrt(info.msg.title,info.msg.msg,info.msg.btn);
  //         }
  //       }else{
  //         if(iosnewversion> splitVersion)
  //         {
  //           this.presentalrt(info.msg.title,info.msg.msg,info.msg.btn);
  //         }
  //       }
  //   })
  // }



  openAppStoreEntry()
  {
    if(this.plt.is('android'))
    {
      window.open("https://play.google.com/store/apps/details?id=io.ionic.pollmaster","_system")//Lyteboxprod
    }
    else
    {
      //window.open("https://apps.apple.com/in/app/LyteboxLive/id1576298090", "_system");
    }

  }

  async presentalrt(header,message,buttonText ='', allowClose = false)
   {
     const buttons = []
     if(buttonText != '')
     {
      buttons.push({text: buttonText,handler:()=>{
        this.openAppStoreEntry()
      }})
     }
     if(allowClose)
     {
       buttons.push({text:'Close',role:'Cancel'})
     }
      const alert = await this.alertController.create({
        header,
        message,
        buttons,backdropDismiss:allowClose
      })
      await alert.present();
   }

   
}
