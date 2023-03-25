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


}
