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

  getContacts():Observable<any>{
    return this.http.get<any>(this.url+'contact')
  }

  getDistrictData():Observable<any>{
    return this.http.get<any>(this.url+'setting/GetAllDistricts')
  }

  getTalukaData(dId:any):Observable<any>{
    return this.http.get<any>(this.url+'setting/GetAllTaluka?id='+dId)
  }

  getVillageData(taluka:any){
   return this.http.get<any>(this.url+'Village/GetAllVillagebyTaluka?taluka='+taluka)
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

