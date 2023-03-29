import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  url = environment.apiUrl

  constructor(private http:HttpClient) { }

  // get appointment list
  getAppointments():Observable<any>{
    return this.http.get<any>(this.url+'Appointment/GetAllAppointment')
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
  searchAppointment(apmDate:any){
    return this.http.get<any>(this.url+'Appointment/GetAppointmentbyDate?dateTime='+apmDate)
  }

}
