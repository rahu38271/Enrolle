import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  // get all news

  getAllNews(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    return this.http.get<any>(this.url+'DailyNews/GetAllDailyNews?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // add edit news

  addSingleNews(file:any,dailynews:any){
    debugger;
    const formData:FormData = new FormData();
    const blob = new Blob([file],{type:file.type});
    formData.append('file',blob,file.name);
    formData.append('dailynews',dailynews);
    return this.http.post<any>(this.url+'DailyNews/InsertUpdateDailyNews',formData)
  }

  // delete news
  delete(id:any){
    debugger;
    return this.http.get<any>(this.url+'DailyNews/DeleteDailyNews?Id='+id)
  }

  // download File
  getFile(id:any):Observable<Blob>{
    return this.http.get(this.url+'DailyNews/DownLoadFile?Id='+id,{responseType: "blob", reportProgress: true,})
  }

}
