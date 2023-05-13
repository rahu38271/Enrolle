import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get All Society
  getAllSociety(PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    // return this.http.get<any>(this.url+'Society/GetAllSociety')
    return this.http.get<any>(this.url+'Society/GetAllSociety?PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // Add society
  addSingleSociety(societyModal:any){
    return this.http.post<any>(this.url+'Society/InsertUpdateSociety', societyModal)
  }

  //delete society
  deleteSociety(id:any){
    return this.http.get<any>(this.url+'Society/DeleteSocietybyId?Id='+id)
  }

}
