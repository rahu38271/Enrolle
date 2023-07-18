import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  whatsappMsgSetting(whatsappSetting:any){
    return this.http.post<any>(this.url+'WhatUp/CreateUpdateWhatUp', whatsappSetting);
  }

  addLandingImage(LandingPageImage:any,file:any):Observable<any>{
    const formData : FormData = new FormData();
    const blob = new Blob([file], {type:file.type});
    formData.append('LandingPageImage',LandingPageImage);
    formData.append('file',blob,file.name);
    return this.http.post<any>(this.url+'Voter/InsertLandingPage', formData)

    // var id = this.http.post<any>(this.url+'Voter/InsertLandingPage', formData)
    // return id;
  }

  addSlipMessage(WhatUpContent:any,file:any){
    const formData:FormData = new FormData();
    const blob = new Blob([file],{type:file.type});
    formData.append('WhatUpContent',WhatUpContent);
    formData.append('file',blob,file.name);
    return this.http.post<any>(this.url+'Voter/InsertUpdateWhatUpContent', formData)
  }

  // landing Image

  getLandingImage(userId:number):Observable<Blob>{
    return this.http.get(this.url+'Voter/GetAllLandingPage?UserId='+userId,{responseType: "blob", reportProgress: true,})
  }

  // voter slip message whatsapp image

  getWhatsappImage(userId:number){
    return this.http.get(this.url+'Voter/GetWhatAppImagebyUserId?UserId='+userId,{responseType:"blob"})
  }

  // voter whatsapp content message text

  getWhatsappText(userId:number){
    return this.http.get(this.url+'Voter/GetWhatAppContentbyUserId?UserId='+userId)
  }

}
