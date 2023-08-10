import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  addSingleSurvey(surveyModal:any){
    debugger;
    return this.http.post<any>(this.url+'Voter/VoterSurvey',surveyModal)
  }
}
