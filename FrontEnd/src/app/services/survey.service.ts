import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  token:String=''
  
  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) {
    this.token = localStorage.getItem('token');
   }

  // add survey
  addSingleSurvey(surveyModal:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/VoterSurvey',surveyModal,{ headers })
  }

  // edit survey
  editSurvey(EditData:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/VoterSurvey',EditData,{ headers })
  }

  //get survey List
  getAllSurvey(userid:any, RoleId:any, PageNo:any, NoofRow:any, Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetAllVoterSurvey?userid='+userid+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearcText='+SearchText,{ headers })
  }


}
