import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl

  // old get contact API
  // getContacts():Observable<any>{
  //   return this.http.get<any>(this.url+'contact')
  // }

  // new get contact api 

  getContacts(PageNo:any, NoofRow:any, SearchText:any):Observable<any>{
    return this.http.get<any>(this.url+'Contact?PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // old district api 
  // getDistrictData():Observable<any>{
  //   return this.http.get<any>(this.url+'setting/GetAllDistricts')
  // }
  // new district api 
  getDistrictData():Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAllDistricts')
  }

  //old taluka api
  // getTalukaData(dId:any):Observable<any>{
  //   return this.http.get<any>(this.url+'setting/GetAllTaluka?id='+dId)
  // }

  // new taluka api
  getTalukaData(dId:any):Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAllTaluka?id='+dId)
  }

  // old village api
  // getVillageData(taluka:any){
  //  return this.http.get<any>(this.url+'Village/GetAllVillagebyTaluka?taluka='+taluka)
  // }

  // new village api
  getVillageData(taluka:any){
    return this.http.get<any>(this.url+'Login/GetVillage?taluka='+taluka)
   }

  addSingleContact(contactModal:any):Observable<any>{
    return this.http.post<any>(this.url+'contact/InsertSingleContact', contactModal)
  }

  UploadExcel(modal:any) {
    return this.http.post<any>(this.url+"Contact/InsertBulkContact", modal )  
  }

  update(edModal:any){
    return this.http.post<any>(this.url+"contact/UpdateSingleContact", edModal);
  }

}

