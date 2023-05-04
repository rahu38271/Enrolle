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
  getAppointments(UserId:any,roleID:any):Observable<any>{
    return this.http.get<any>(this.url+'Appointment/GetAllAppointment?UserId='+UserId+'&RoleId='+roleID);
  }

  // get appointment list
  getAppointmentByUser(UserId:any){
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyUserId?UserId='+UserId);
  }

  // today appointmentList 

  todaysApm(UserId:any, roleID:any){
    return this.http.get<any>(this.url+'Appointment/GetTodayAppointment?UserId='+UserId+'&RoleId='+roleID)
  }

  // single api for add and update appointment 
  // if id is available in json object then it is update else add
  addSingleAppointment(appointmentModal:any){
    return this.http.post<any>(this.url+'Appointment/InsertUpdateAppointment',appointmentModal)
  }

  // delete appointment
  deleteAppointment(id:any):Observable<any>{
    return this.http.get<any>(this.url+'Appointment/DeleteAppointmentbyId?Id='+id)
  }

  // get appointment by date
  searchAppointment(UserId:any,roleID:any,FromDate:any,ToDate:any){
    debugger;
    //return this.http.get<any>(this.url+'Appointment/GetAppointmentbyDate?UserId='+UserId+'&RoleId='+roleID+'&dateTime='+apmDate)
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyFromToDate?UserId='+UserId+'&RoleId='+roleID+'&FromDate='+FromDate+'&ToDate='+ToDate)
  }

  //approve reject reschedule appointment 

  updateApmStatus(id:any,Status:any,dateTime:any){
    debugger;
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
