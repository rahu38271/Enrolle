import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewVoterService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get all new voters
  getAllNewVoter():Observable<any>{
    return this.http.get<any>(this.url+'NewVoter/GetAllNewVoter')
  }

  // add / edit new voters
  addSingleNewVoter(newVoterModal:any){
    return this.http.post<any>(this.url+'NewVoter/InsertUpdateNewVoter', newVoterModal)
  }

  // delete new voter
  deleteNewVoter(id:any){
    return this.http.get<any>(this.url+'NewVoter/DeleteNewVoterbyId?Id='+id)
  }

}
