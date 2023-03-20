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

  GetAdminbySuperAdminId(superId:any):Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAdminbySuperAdminId?superid='+superId)
  }

  GetVolunterbyAdminId(adminid:any):Observable<any>{
    return this.http.get<any>(this.url+'Login/GetVolunterbyAdminId?adminid='+adminid)
  }

  addMAdminData(addMAmodal:any):Observable<any>{
    return this.http.post<any>(this.url+'Login/CreateUpdateUser', addMAmodal)
  }

  edit(edModal:any):Observable<any>{
    return this.http.post<any>(this.url + 'Login/CreateUpdateUser', edModal);
  }

  // deleteUser(id){
  //   debugger;
  //   return this.http.post<any>(this.url+'Login/DeleteUser?Id='+id,{id})
  // }

  getBooths():Observable<any>{
    return this.http.get<any>(this.url+'Voter/GetDistinctPartNumber')
  }

  GetpartByUserid(id:any){
    return this.http.get<any>(this.url+'Auth/GetPartNumberbyId?userid='+id)
  }

  assignPart(assignmodal:any):Observable<any>{
    return this.http.post<any>(this.url+'Auth/InsertUpdateUserAssigned' ,assignmodal)
  }

  getAllAssignedPart():Observable<any>{
    return this.http.get<any>(this.url+'auth/GetPartNoAssigned')
  }

  getAssignedPartByUser(Userid:any):Observable<any>{
    debugger;
    return this.http.get<any>(this.url+'Auth/GetPartNoAssigned?userid='+Userid)
  }

  GetPartNoAssignedOtherthanThisuser(userID:any){
    return this.http.get<any>(this.url+'Auth/GetPartNoAssignedOtherthanThisuser?userid='+userID)
  }
}
