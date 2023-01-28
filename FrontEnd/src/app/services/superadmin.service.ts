import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAllMAdmin():Observable<any>{
    return this.http.get<any>(this.url+'SuperAdmin/GetAllSuperAdmin')
  }

  addMAdminData(addMAmodal:any){
    return this.http.post<any>(this.url+'SuperAdmin/InsertSuperAdmin', addMAmodal)
  }

  edit(edModal:any):Observable<any>{
    return this.http.post<any>(this.url + 'SuperAdmin/UpdateSuperAdmin', edModal);
  }
}
