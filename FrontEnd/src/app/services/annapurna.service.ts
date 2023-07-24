import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnapurnaService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get all list of annapurna
  getAnnapurnaList():Observable<any>{
    return this.http.get<any>(this.url+'Annapurna/GetAllAnnapurna')
  }

  // add / edit single annapurna
  addSingleAnnapurna(annapurnaModal:any){
    return this.http.post<any>(this.url+'Annapurna/InsertUpdateAnnapurna',annapurnaModal)
  }

  // delete annapurna
  deleteAnnapurna(id:any){
    return this.http.get<any>(this.url+'Annapurna/DeleteAnnapurnabyId?Id='+id)
  }

  // add family
  addAnnapurnaFamily(FamilyModal:any){
    return this.http.post<any>(this.url+'Annapurna/InsertUpdateFamily', FamilyModal)
  }

   //getFamilyList
  getFamilyList(anpnid:any){
    return this.http.get<any>(this.url+'Annapurna/GetAllFamilybyId?anpnid='+anpnid)
  }

  //remove family 
  removeFamily(remFamModal:any){
    debugger;
    return this.http.post(this.url+'Annapurna/RemoveFamily',remFamModal)
  }

}
