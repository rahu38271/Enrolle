import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BoothService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  getBoothData():Observable<any>{
    return this.http.get<any>(this.url+'Booth/GetAllBooth')
  }

  addSingleBooth(addBoothModal:any):Observable<any>{
    return this.http.post<any>(this.url+'Booth/InsertBooth', addBoothModal)
  }

  uploadExcel(modal:any){
    return this.http.post<any>(this.url+'Booth/InsertBoothBulkList', modal)
  }


}
