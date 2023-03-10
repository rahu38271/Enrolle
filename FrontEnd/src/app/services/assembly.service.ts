import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssemblyService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  // old assembly api
  // getAssemblyData():Observable<any>{
  //   return this.http.get<any>(this.url + 'Assembly/GetAllAssembly')
  // }

  // new assembly api
  getAssemblyData():Observable<any>{
    return this.http.get<any>(this.url + 'Login/GetAllassembly')
  }

  addSingleAssembly(asemblyModal:any):Observable<any>{
    return this.http.post<any>(this.url+'Assembly/InsertAssembly', asemblyModal )
  }

  uploadExcel(modal:any){
    return this.http.post<any>(this.url+'Assembly/InsertBulkAssemblyList', modal)
  }

 
}
