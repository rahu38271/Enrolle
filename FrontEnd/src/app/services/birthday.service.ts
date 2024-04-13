import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  token:String=''

  url = environment.apiUrl;

  constructor(private http:HttpClient) { 
    this.token = localStorage.getItem('token');
  }

  getBirthdays():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'notifications/GetTodaysNotification?NotificationType=Birthday',{ headers });
  }
}
