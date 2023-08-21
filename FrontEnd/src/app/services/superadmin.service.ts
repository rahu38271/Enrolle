import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import {environment } from 'src/environments/environment'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  url = environment.apiUrl;
  getAllAdminList: any;
  token:String=''

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getAllAdmin():Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAllUser')
  }

  GetAdminbySuperAdminId(superId:any):Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAdminbySuperAdminId?superid='+superId)
  }

  GetVolunterbyAdminId(adminid:any):Observable<any>{
    return this.http.get<any>(this.url+'Login/GetVolunterbyAdminId?adminid='+adminid)
  }

  getMemberBySociety(id:any):Observable<any>{
    return this.http.get<any>(this.url+'Login/GetAllSocietyMember?userid='+id)
  }

  addMAdminData(addMAmodal:any):Observable<any>{
    return this.http.post<any>(this.url+'Login/CreateUpdateUser', addMAmodal)
  }

  edit(edModal:any):Observable<any>{
    return this.http.post<any>(this.url + 'Login/CreateUpdateUser', edModal);
  }

  deleteUser(id:any):Observable<any>{
    return this.http.get<any>(this.url + 'Login/DeleteUser?Id='+id)
  }

  // old code
  getBooths(Role:any, UserId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetDistinctPartNumber?Role='+Role+'&UserId='+UserId,{ headers })
  }

  // new code 
  // getBooths(Role:any, UserId:any){
  //   return this.http.get<any>(this.url+'Voter/GetDistinctPartNumber?roleid='+Role+'&UserId='+UserId)
  // }

  getBoothsbyroleandUserId(userid:any,userrole:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    if(userrole==2)
    {
      return this.http.get<any>(this.url+'Voter/GetDistinctPartNumber',{ headers })
    }
    else(userrole==3)
    {
    return this.http.get<any>(this.url+'Auth/GetPartNumberbyId?userid='+userid,{ headers })
      }
    }

  GetpartByUserid(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Auth/GetPartNumberbyId?userid='+id,{ headers })
  }

  assignPart(assignmodal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Auth/InsertUpdateUserAssigned' ,assignmodal,{ headers })
  }

  getAllAssignedPart():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'auth/GetPartNoAssigned',{ headers })
  }

  getAssignedPartByUser(Userid:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Auth/GetPartNoAssigned?userid='+Userid,{ headers })
  }

  GetPartNoAssignedOtherthanThisuser(userID:any,role: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Auth/GetPartNoAssignedOtherthanThisuser?userid='+userID+'&roleid='+role,{ headers })
  }
}
