import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  token:String=''

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }

  // all office dropdown
  getAllOffice(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetOffice',{ headers })
  }

  // add office
  addOffice(OfficeModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'Letter/CreateUpdateOffice',OfficeModal,{ headers })
  }

  // all department dropdown
  getAllDept(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetDepartmet',{ headers })
  }

  // add department
  addDept(deptModal:any,){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'Letter/CreateUpdateDepartment',deptModal,{ headers })
  }
  
  // get all letters
  getAllLetters(UserId:any, RoleId:any, PageNo:any, NoofRow:any, SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetAllLetter?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  // delete letters
  deleteLetter(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/DeleteLetterbyId?Id='+id,{ headers })
  }

  // add letter
  addSingleLetter(letter:any,file:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData : FormData = new FormData();
    const blob = new Blob([file], {type:file.type})
    formData.append('file',blob,file.name);
    
    formData.append('letter',letter);
    return this.http.post<any>(this.url+'Letter/CreateUpdateLetter',formData,{ headers })
  }

  // download letter
  downloadLetter(id:any): Observable<Blob>{
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Letter/DownLoadFile?Id='+id,{responseType: "blob", reportProgress: true, headers })
  }

  // letter dashboard count
  getDashboardCount(UserId:any, RoleId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetDashBoardCount?UserId='+UserId+'&RoleId='+RoleId,{ headers })
  }

  // subletter list by id
  getLetter(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetLetterById?Id='+id,{ headers })
  }

  //all subletter list
  getSubletterList(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'SubLetter/GetSubLetterbyId?Id='+id,{ headers })
  }

  // add subletter
  addSubLetter(subletter:any, file:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData : FormData = new FormData();
    const blob = new Blob([file], {type:file.type})
    formData.append('file',blob,file.name);
    formData.append('subletter',subletter);
    return this.http.post(this.url+'SubLetter/CreateUpdateSubLetter',formData,{ headers })
  }

  // download subletter
  downloadSubLetter(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'SubLetter/DownLoadFile?Id='+id,{responseType: "blob", reportProgress: true, headers })
  }

  // delete subletter
  deleteSubletter(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'SubLetter/DeleteSubLetterbyId?Id='+id,{ headers })
  }

  // letter by status 
  getLetterByStatus(UserId:any, RoleId:any, PageNo:any, NoofRow:any, Status:any,SearchText){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetLetterbyStatusandDate?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Status='+Status+'&SearchText='+SearchText,{ headers })
  }

  // letter by date
  getLetterByDate(UserId:any, RoleId:any, PageNo:any, NoofRow:any, Status:any, StartDate:any, EndDate:any, SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Letter/GetLetterbyStatusandDate?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Status='+Status+'&StartDate='+StartDate+'&EndDate='+EndDate+'&SearchText='+SearchText,{ headers })
  }
}
