import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  token:String=''

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) {
    this.token = localStorage.getItem('token');
   }

  // add type of work 
  getWork(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/GetAllTypeofWorks',{ headers })
  }
  
  // get type of complaint 
  getComplaints(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/GetAllTypeOfComplaints',{ headers })
  }

  // get type of form 
  getForms(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/GetAllTypeOfForms',{ headers })
  }

  // get type of area 
  getArea(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/GetAllArea',{ headers })
  }

  // add type of work
  addSingleWork(workModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'GeneralEnquiry/InsertTypeofWork', workModal,{ headers })
  }

  //add area
  addSingleArea(areaModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'GeneralEnquiry/InsertArea',areaModal,{ headers })
  }

  // add type of form
  addSingleform(formsModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'GeneralEnquiry/InsertTypeOfForm', formsModal,{ headers })
  }

  // add type of complaint
  addSingleComplaint(complaintModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'GeneralEnquiry/InsertTypeofComplaint',complaintModal,{ headers })
  }

  //get all general enquiry
  getAllEnquiry(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/GetAllEnquiry?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText,{ headers })
  }

  //delete enquiry
  deleteEnq(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/DeleteEnquirybyId?Id='+id,{ headers })
  }

  //add enquiry
  addSingleEnquiry(enquiryModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'GeneralEnquiry/InsertUpdateGeneralEnquiry',enquiryModal,{ headers })
  }

  // search enquiry

  searchEnquiry(searchModal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'GeneralEnquiry/SearchEnquiry',searchModal,{ headers })
  }

  // datewise enquiry

  enquiryByDate(UserId:any,RoleId:any,PageNo:any,NoofRow:any,TypeofWork:any,FromDate:any,ToDate:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'GeneralEnquiry/GetEnquirybyTypeofWork?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&TypeofWork='+TypeofWork+'&FromDate='+FromDate+'&ToDate='+ToDate,{ headers })
  }
}
