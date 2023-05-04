import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get All Complaints

  getAllComplaints():Observable<any>{
    return this.http.get<any>(this.url+'Society/GetSocietyComplaints')
  }

  // add and edit complaint

  addSingleComplaint(complaintModal:any){
    return this.http.post<any>(this.url+'Society/InsertUpdateSocietyComplaint', complaintModal)
  }

  // complaints dashboard count

  getComplaintCount():Observable<any>{
    return this.http.get<any>(this.url+'Society/GetComplaintCount')
  }

  // complaint report by status

  getComplaintByStatus(Status:any){
    return this.http.get<any>(this.url+'Society/GetComplaintsbyStatus?Status='+Status)
  }

  // update complaint status

  updateComplaintStatus(Id:any,Status:any){
    debugger;
    return this.http.post<any>(this.url+'Society/UpdateComplaintStatus?Id='+Id+'&Status='+Status, Id)
  }

  // delete complaint
  deleteComplaint(id:any){
    debugger
    return this.http.get<any>(this.url+'Society/DeleteSocietyComplaintbyId='+id)
  }

}
