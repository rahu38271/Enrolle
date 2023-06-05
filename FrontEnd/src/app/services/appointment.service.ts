import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get appointment list
  getAppointments(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any):Observable<any>{
    // return this.http.get<any>(this.url+'Appointment/GetAllAppointment?UserId='+UserId+'&RoleId='+roleID);
    return this.http.get<any>(this.url+'Appointment/GetAllAppointment?UserId='+UserId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText )
  }

  // get approved appointment list
  getApprovedAppointments(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any){
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyStatus?Status=Approved&UserId='+UserId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // get rejected appointment list
  getRejectedAppointments(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any){
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyStatus?Status=Rejected&UserId='+UserId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // get appointment list
  getAppointmentByUser(UserId:any,PageNo:any,NoofRow:any,SearchText:any){
    // return this.http.get<any>(this.url+'Appointment/GetAppointmentbyUserId?UserId='+UserId);
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyUserId?UserId='+UserId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText);
  }

  // today appointmentList 

  todaysApm(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any){
    // return this.http.get<any>(this.url+'Appointment/GetTodayAppointment?UserId='+UserId+'&RoleId='+roleID)
    return this.http.get<any>(this.url+'Appointment/GetTodayAppointment?UserId='+UserId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  // single api for add and update appointment 
  // if id is available in json object then it is update else add
  // addSingleAppointment(appointmentModal:any){
  //   return this.http.post<any>(this.url+'Appointment/InsertUpdateAppointment',appointmentModal)
  // }

  addSingleAppointment(file:any, appointments:any):Observable<any>{
    debugger;
    const formData : FormData = new FormData();
   // const formData1 : FormData = new FormData();
    // code to make file optional while adding complaint
    const blob = new Blob([file], {type:file.type})
    formData.append('file',blob,file.name);
    formData.append('appointments',appointments)
     
    //formData.append('societycomplaint',JSON.stringify(societycomplaint));
    //formData.append('dataoje',data);
    //formData.append("file",fileupload);
    return this.http.post<any>(this.url+'Appointment/InsertUpdateAppointment', formData)
  }

  // delete appointment
  deleteAppointment(id:any):Observable<any>{
    return this.http.get<any>(this.url+'Appointment/DeleteAppointmentbyId?Id='+id)
  }

  // get appointment by date
  searchAppointment(UserId:any,roleID:any,FromDate:any,ToDate:any,PageNo:any,NoofRow:any,SearchText:any){
    // return this.http.get<any>(this.url+'Appointment/GetAppointmentbyFromToDate?UserId='+UserId+'&RoleId='+roleID+'&FromDate='+FromDate+'&ToDate='+ToDate)
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyFromToDate?UserId='+UserId+'&RoleId='+roleID+'&FromDate='+FromDate+'&ToDate='+ToDate+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&SearchText='+SearchText)
  }

  //approve reject reschedule appointment 

  updateApmStatus(id:any,Status:any,dateTime:any){
    return this.http.post<any>(this.url+'Appointment/UpdateAppointmnetStatus?Id='+id+'&Status='+Status+'&dateTime='+dateTime, id)
  }

  // appointment count

  getApmCounts(UserId:any,roleID:any){
    return this.http.get<any>(this.url+'Appointment/GetAppointmentCount?UserId='+UserId+'&RoleId='+roleID)
  }

  // get appointment by admin

  getApmByAdmin(){
    return this.http.get<any>(this.url+'Appointment/GetAppointmentCountbyUser')
  }

}
