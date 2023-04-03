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
  getAllSociety():Observable<any>{
    return this.http.get<any>(this.url+'Society/GetAllSociety')
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
