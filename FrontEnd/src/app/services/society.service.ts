import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {

  token:String=''

  url = environment.apiUrl

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  // get All Society
  getAllSociety(PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    // return this.http.get<any>(this.url+'Society/GetAllSociety')
    return this.http.get<any>(this.url+'Society/GetAllSociety?PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  // Add society
  addSingleSociety(societyModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Society/InsertUpdateSociety', societyModal,{ headers })
  }

  //delete society
  deleteSociety(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/DeleteSocietybyId?Id='+id,{ headers })
  }

}
