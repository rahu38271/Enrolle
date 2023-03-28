import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // login url = "http://eaapi.test.obicas.in/api/Auth/Login?Username=7219171929&Password=Niki@123"
    //Superadmin login url =  "http://eaapi.test.obicas.in/api/Login/LoginAdmin?Username=8800122455&Password=password13"

  // password url = "http://eaapi.test.obicas.in/api/Auth/ChangeUserPassword?Id=5&Password=user@123"

  userType:any;

  url=environment.apiUrl;

  constructor(public http: HttpClient) { }

  // // step - 1.  admin Login API 

  loginAdmin(Username:string,Password:string):Observable<any>{
    return this.http.get<any>(this.url+'Login/LoginUser?Username='+Username+'&Password='+Password+'');
  }


  // step - 2. DB configure 
  DBConfig(DBConfigModal:any){
    return this.http.post<any>(this.url+'Login/InsertUpdateDBConfigure', DBConfigModal)
  }

  sendOtp(Contact:any){
    return this.http.get(this.url+'Auth/Otp?Contact='+Contact);
  }

  changePassword(id:any,PassWord:any){
    
    return this.http.post(this.url+"Login/UpdatePassword?Id="+id+"&PassWord="+PassWord, {id,PassWord})
  } 
}
