import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // login url = "http://eaapi.test.obicas.in/api/Auth/Login?Username=7219171929&Password=Niki@123"

  // password url = "http://eaapi.test.obicas.in/api/Auth/ChangeUserPassword?Id=5&Password=user@123"

  userType:any;

  url=environment.apiUrl;

  constructor(public http: HttpClient) { }

  loginUser(Username:string,Password:string):Observable<any>{
    return this.http.get<any>(this.url+'Auth/Login?Username='+Username+'&Password='+Password+'');
  }

  sendOtp(Contact:any){
    return this.http.get(this.url+'Auth/Otp?Contact='+Contact);
  }

  changePassword(id:any,Password:any){
    return this.http.post(this.url+"Auth/ChangeUserPassword?Id="+id+"&Password="+Password, {id,Password})
  }
  
}
