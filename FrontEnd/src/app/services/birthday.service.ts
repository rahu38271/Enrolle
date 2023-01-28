import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getBirthdays():Observable<any>{
    return this.http.get<any>(this.url+'notifications/GetTodaysNotification?NotificationType=Birthday');
  }
}
