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

  getReportsList(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    return this.http.get<any>(this.url+'ActivityLog/GetActivityLogs?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // reports by Date

  getReportByDate(UserId:any,RoleId:any,PageNo:any,NoofRow:any,FromDate:any,ToDate:any){
    debugger;
    return this.http.get<any>(this.url+'ActivityLog/GetActivityLogsBetweenDate?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&FromDate='+FromDate+'&ToDate='+ToDate)
  }
}
