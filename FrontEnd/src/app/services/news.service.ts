import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  token:String=''

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) {
    this.token = localStorage.getItem('token');
   }

  // get all news

  getAllNews(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'DailyNews/GetAllDailyNews?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  // add edit news

  addSingleNews(file:any,dailynews:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData:FormData = new FormData();
    const blob = new Blob([file],{type:file.type});
    formData.append('file',blob,file.name);
    formData.append('dailynews',dailynews);
    return this.http.post<any>(this.url+'DailyNews/InsertUpdateDailyNews',formData,{ headers })
  }

  // delete news
  delete(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'DailyNews/DeleteDailyNews?Id='+id,{ headers })
  }

  // download File
  getFile(id:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'DailyNews/DownLoadFile?Id='+id,{responseType: "blob", reportProgress: true,headers})
  }

}
