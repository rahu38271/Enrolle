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

  getAllAdmin():Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAllUser')
  }

  GetAdminbySuperAdminId(superId:any){
    return this.http.get<any>(this.url+'Login/GetAdminbySuperAdminId?superid='+superId)
  }

  GetVolunterbyAdminId(adminid:any){
    return this.http.get<any>(this.url+'Login/GetVolunterbyAdminId?adminid='+adminid)
  }

  addMAdminData(addMAmodal:any){
    debugger;
    return this.http.post<any>(this.url+'Login/CreateUpdateUser', addMAmodal)
  }

  edit(edModal:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.url + 'Login/CreateUpdateUser', edModal);
  }

  delete(id:any){
    return this.http.get<any>(this.url + 'Login/DeleteUser?Id='+id)
  }

  getBooths(){
    return this.http.get<any>(this.url+'Voter/GetDistinctPartNumber')
  }

  partByUser(id:any){
    return this.http.get<any>(this.url+'Auth/GetPartNumberbyId?userid='+id)
  }

  // assign booths to volunteers

  assignPart(assignmodal:any):Observable<any>{
    return this.http.post<any>(this.url+'Auth/InsertUpdateUserAssigned' ,assignmodal)
  }

  getAllAssignedPart(){
    return this.http.get<any>(this.url+'auth/GetPartNoAssigned')
  }
  
}
