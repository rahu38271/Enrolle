import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AnniversaryService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }
  getAnniversary():Observable<any>{
    return this.http.get(this.url+'notifications/GetTodaysNotification?NotificationType=Anniversary')
  }
}
