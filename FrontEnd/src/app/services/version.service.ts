import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  token:string='';

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) {
    this.token = localStorage.getItem('token');
   }

  addNewVersion(versionModal:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Version/InsertUpdateVersion',versionModal,{ headers })
   }

   //get version
   getandroidVersion(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Version/GetAllVersion',{ headers })
   }
}
