import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  token:String=''

  url = environment.apiUrl

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  // get All Complaints

  getAllComplaints(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/GetSocietyComplaints?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  // get All Complaints by userId

  getComplaintsByUserId(UserId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/GetSocietyComplaintbyUserId?UserId='+UserId,{ headers })
  }

  // get todays complaints
  getTodayComplaint(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/GetTodayComplaint?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  // add and edit complaint

  // addSingleComplaint(complaintModal:any):Observable<any>{
  //   debugger;
  //   const formData : FormData = new FormData();
  //   return this.http.post<any>(this.url+'Society/InsertUpdateSocietyComplaint', complaintModal)
  // }

  addSingleComplaint(file:any, societycomplaint:any):Observable<any>{
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData : FormData = new FormData();
   // const formData1 : FormData = new FormData();
    // code to make file optional while adding complaint
    const blob = new Blob([file], {type:file.type})
    formData.append('file',blob,file.name);
    formData.append('societycomplaint',societycomplaint);
    return this.http.post<any>(this.url+'Society/InsertUpdateSocietyComplaint', formData,{ headers })
  }

  // complaints dashboard count

  getComplaintCount(UserId:any,RoleId:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/GetComplaintCountbyUserId?UserId='+UserId+'&RoleId='+RoleId,{ headers })
  }

  // complaint report by status

  getComplaintByStatus(UserId:any,RoleId:any,Status:any,PageNo:any,NoofRow:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/GetComplaintsbyStatus?UserId='+UserId+'&RoleId='+RoleId+'&Status='+Status+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  // update complaint status

  updateComplaintStatus(Id:any,Status:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Society/UpdateComplaintStatus?Id='+Id+'&Status='+Status, Id,{ headers })
  }

  // delete complaint
  deleteComplaint(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    // return this.http.get<any>(this.url+'Society/DeleteSocietyComplaintbyId='+id)
    return this.http.get<any>(this.url+'Society/DeleteSocietyComplaintbyId?Id='+id,{ headers })
  }

  getFile(id:any): Observable<Blob>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Society/DownLoadFile?Id='+id,{responseType: "blob", reportProgress: true, headers})
  }

  // datewise report
  reportByDate(UserId:any,RoleId:any,FromDate:any,ToDate:any,Status:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Society/GetSocietyComplaintFromDate?UserId='+UserId+'&RoleId='+RoleId+'&FromDate='+FromDate+'&ToDate='+ToDate+'&Status='+Status,{ headers })
  }
}
