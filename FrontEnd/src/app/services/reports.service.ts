import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  url = environment.apiUrl

  constructor(
    private http:HttpClient
  ) { }

  // get All Reports

  getReportsList(userId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    debugger;
    return this.http.get<any>(this.url+'ActivityLog/GetActivityLogs?UserId='+userId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // reports by Date

  getReportByDate(UserId:any,RoleId:any,PageNo:any,NoofRow:any,FromDate:any,ToDate:any){
    return this.http.get<any>(this.url+'ActivityLog/GetActivityLogsBetweenDate?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&FromDate='+FromDate+'&ToDate='+ToDate)
  }

  // reports by user

  getReportByUser(FromDate:any,ToDate:any,Id:any,RoleId:any){
    return this.http.get<any>(this.url+'ActivityLog/GetActivityLogCountbyUserId?FromDate='+FromDate+'&ToDate'+ToDate+'&RoleId='+RoleId+'&Id='+Id)
  }

  
}
