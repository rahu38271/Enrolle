import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  token:string='';

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) {
    this.token = localStorage.getItem('token');
   }

  getMainDashoardCount(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetMainDashBoards',{ headers })
  }



  getBirthdayGraph(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'notifications/LastSevenDayCountsbyEvent?Type=Birthday',{ headers })
  }
}
