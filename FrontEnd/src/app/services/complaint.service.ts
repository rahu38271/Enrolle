import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get All Complaints

  getAllComplaints(PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    return this.http.get<any>(this.url+'Society/GetSocietyComplaints?PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // get todays complaints
  getTodayComplaint(PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    return this.http.get<any>(this.url+'Society/GetTodayComplaint?PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // add and edit complaint

  // addSingleComplaint(complaintModal:any):Observable<any>{
  //   debugger;
  //   const formData : FormData = new FormData();
  //   return this.http.post<any>(this.url+'Society/InsertUpdateSocietyComplaint', complaintModal)
  // }

  addSingleComplaint(file:any, societycomplaint:any):Observable<any>{
    debugger;
    const formData : FormData = new FormData();
   // const formData1 : FormData = new FormData();
    // code to make file optional while adding complaint
    const blob = new Blob([file], {type:file.type})
    formData.append('file',blob,file.name);
    
    formData.append('societycomplaint',societycomplaint);
     
    //formData.append('societycomplaint',JSON.stringify(societycomplaint));
    //formData.append('dataoje',data);
    //formData.append("file",fileupload);
    return this.http.post<any>(this.url+'Society/InsertUpdateSocietyComplaint', formData)
  }

  // complaints dashboard count

  getComplaintCount():Observable<any>{
    return this.http.get<any>(this.url+'Society/GetComplaintCount')
  }

  // complaint report by status

  getComplaintByStatus(Status:any,PageNo:any,NoofRow:any,SearchText:any){
    // return this.http.get<any>(this.url+'Society/GetComplaintsbyStatus?Status='+Status)
    return this.http.get<any>(this.url+'Society/GetComplaintsbyStatus?Status='+Status+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // update complaint status

  updateComplaintStatus(Id:any,Status:any){
    return this.http.post<any>(this.url+'Society/UpdateComplaintStatus?Id='+Id+'&Status='+Status, Id)
  }

  // delete complaint
  deleteComplaint(id:any){
    // return this.http.get<any>(this.url+'Society/DeleteSocietyComplaintbyId='+id)
    return this.http.get<any>(this.url+'Society/DeleteSocietyComplaintbyId?Id='+id)
  }

  getFile(id:any): Observable<Blob>{
    return this.http.get(this.url+'Society/DownLoadFile?Id='+id,{responseType: "blob", reportProgress: true,})
  }

  

}
