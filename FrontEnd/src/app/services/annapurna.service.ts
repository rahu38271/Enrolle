import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnapurnaService {

  token:String=''

  url = environment.apiUrl;

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  // get all list of annapurna
  getAnnapurnaList():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Annapurna/GetAllAnnapurna',{ headers })
  }

  // add / edit single annapurna
  addSingleAnnapurna(annapurnaModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Annapurna/InsertUpdateAnnapurna',annapurnaModal,{ headers })
  }

  // delete annapurna
  deleteAnnapurna(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Annapurna/DeleteAnnapurnabyId?Id='+id,{ headers })
  }

  // add family
  addAnnapurnaFamily(FamilyModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Annapurna/InsertUpdateFamily', FamilyModal,{ headers })
  }

   //getFamilyList
  getFamilyList(anpnid:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Annapurna/GetAllFamilybyId?anpnid='+anpnid,{ headers })
  }

  //remove family 
  removeFamily(remFamModal:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'Annapurna/RemoveFamily',remFamModal,{ headers })
  }

}
