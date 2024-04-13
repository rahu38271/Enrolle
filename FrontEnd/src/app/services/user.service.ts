import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUserData():Observable<any>{
    return this.http.get<any>(this.url+'Auth/GetAllUser');
  }

  addUser(addUserModal:any):Observable<any>{
    return this.http.post<any>(this.url+'Auth/InsertUser', addUserModal)
  }

  update(edModal:any){
    return this.http.post<any>(this.url+'Auth/UpdateUser', edModal)
  }

  delete(id){
    return this.http.post<any>(this.url+'Auth/DeleteUser?Id='+id, {id})
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
  
  // getVoterByPart(id:any){
  //   return this.http.get<any>(this.url+'Voter/GetVoterbyUserId?userid='+id)
  // }

}
