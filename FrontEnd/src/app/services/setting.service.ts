import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient) { }

  whatsappMsg(number:any,type:any,message:any,media_url:any,filename:any,instance_id:any,access_token:any){
    return this.http.get<any>('https://app.imsscall.in/api/send.php?number='+number+'&type='+type+'&message='+message+'&media_url='+media_url+'&filename='+filename+'&instance_id='+instance_id+'&access_token='+access_token);
  }

}
