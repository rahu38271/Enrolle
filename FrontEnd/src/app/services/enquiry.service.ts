import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  // add type of work 
  getWork(){
    return this.http.get(this.url+'GeneralEnquiry/GetAllTypeofWorks')
  }
  
  // get type of complaint 
  getComplaints(){
    return this.http.get(this.url+'GeneralEnquiry/GetAllTypeOfComplaints')
  }

  // get type of form 
  getForms(){
    return this.http.get(this.url+'GeneralEnquiry/GetAllTypeOfForms')
  }

  // get type of area 
  getArea(){
    return this.http.get(this.url+'GeneralEnquiry/GetAllArea')
  }

  // add type of work
  addSingleWork(workModal:any){
    return this.http.post(this.url+'GeneralEnquiry/InsertTypeofWork', workModal)
  }

  //add area
  addSingleArea(areaModal:any){
    return this.http.post(this.url+'GeneralEnquiry/InsertArea',areaModal)
  }

  // add type of form
  addSingleform(formsModal:any){
    return this.http.post(this.url+'GeneralEnquiry/InsertTypeOfForm', formsModal)
  }

  // add type of complaint
  addSingleComplaint(complaintModal:any){
    return this.http.post(this.url+'GeneralEnquiry/InsertTypeofComplaint',complaintModal)
  }

  //get all general enquiry
  getAllEnquiry(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    return this.http.get(this.url+'GeneralEnquiry/GetAllEnquiry?UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  //delete enquiry
  deleteEnq(id:any){
    return this.http.get(this.url+'GeneralEnquiry/DeleteEnquirybyId?Id='+id)
  }

  //add enquiry
  addSingleEnquiry(enquiryModal:any){
    return this.http.post(this.url+'GeneralEnquiry/InsertUpdateGeneralEnquiry',enquiryModal)
  }
}
