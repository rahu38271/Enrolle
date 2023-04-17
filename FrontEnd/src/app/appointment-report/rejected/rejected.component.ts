import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {

  getApmList:any;
  status:any;

  constructor(
    private appointment:AppointmentService
  ) { }

  ngOnInit(): void {
    this.rejectedList();
  }

  isBigEnough(element, index, array) { 
    return (element.status == "Rejected"); 
 } 

 rejectedList(){
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
