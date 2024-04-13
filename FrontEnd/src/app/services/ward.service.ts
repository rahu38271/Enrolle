import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WardService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getWardData():Observable<any>{
    return this.http.get<any>(this.url+'Ward/GetAllWard')
  }

  addSingleWard(addWardModal:any):Observable<any>{
    return this.http.post<any>(this.url+'Ward/InsertWard', addWardModal);
  }

  uploadExcel(modal:any):Observable<any>{
    return this.http.post<any>(this.url+'Ward/InsertBulkWardList',modal)
  }
}
