import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  whatsappMsgSetting(whatsappSetting:any){
    debugger;
    return this.http.post<any>(this.url+'WhatUp/CreateUpdateWhatUp', whatsappSetting);
  }

}
