import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import {environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  token:String=''

  url = environment.apiUrl;

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  whatsappMsgSetting(whatsappSetting:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'WhatUp/CreateUpdateWhatUp', whatsappSetting,{ headers });
  }

  addLandingImage(LandingPageImage:any,file:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData : FormData = new FormData();
    const blob = new Blob([file], {type:file.type});
    formData.append('LandingPageImage',LandingPageImage);
    formData.append('file',blob,file.name);
    return this.http.post<any>(this.url+'Voter/InsertLandingPage', formData,{ headers })

    // var id = this.http.post<any>(this.url+'Voter/InsertLandingPage', formData)
    // return id;
  }

  addSlipMessage(WhatUpContent:any,file:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData:FormData = new FormData();
    const blob = new Blob([file],{type:file.type});
    formData.append('WhatUpContent',WhatUpContent);
    formData.append('file',blob,file.name);
    return this.http.post<any>(this.url+'Voter/InsertUpdateWhatUpContent', formData,{ headers })
  }

  // landing Image

  getLandingImage(userId:number):Observable<Blob>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Voter/GetAllLandingPage?UserId='+userId,{responseType: "blob", reportProgress: true,headers})
  }

  // voter slip message whatsapp image

  getWhatsappImage(userId:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Voter/GetWhatAppImagebyUserId?UserId='+userId,{responseType:"blob",headers})
  }

  // voter whatsapp content message text

  getWhatsappText(userId:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Voter/GetWhatAppContentbyUserId?UserId='+userId,{ headers })
  }

  // birthday,anniversary sms setting
  addBdayAnniSetting(smsSetting:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'SmsSetting/InsertUpdateSmsSetting',smsSetting,{ headers })
  }

}
