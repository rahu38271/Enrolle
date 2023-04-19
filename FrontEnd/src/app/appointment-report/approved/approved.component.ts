import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  getApmList:any;
  status:any;

  constructor(
    private appointment:AppointmentService
  ) { }

  ngOnInit(): void {
    this.approvedList();
  }

   isBigEnough(element, index, array) { 
    return (element.status == "Approved"); 
 } 

  approvedList(){
    this.appointment.getAppointments().subscribe(data=>{
      if(data != 0){
        this.getApmList = data.filter(this.isBigEnough)
      }
      else{
      }
    },(err)=>{

    })
    
  }


}
