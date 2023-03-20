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

  getAppointments():Observable<any>{
    return this.http.get<any>(this.url+'Appointment/GetAllAppointment')
  }

  addSingleAppointment(appointmentModal:any){
    return this.http.post<any>(this.url+'Appointment/InsertUpdateAppointment',appointmentModal)
  }


}
