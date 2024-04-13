import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminwise',
  templateUrl: './adminwise.component.html',
  styleUrls: ['./adminwise.component.css']
})
export class AdminwiseComponent implements OnInit {

  apmByAdmin:any;

  constructor(
    private appointment:AppointmentService,
    private router:Router, 
  ) { }

  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.apmListByAdmin();
  }

  apmListByAdmin(){
    this.appointment.getApmByAdmin().subscribe(data=>{
      if(data.length != 0){
        this.apmByAdmin = data
      }
      else{

      }
    },(err)=>{

    })
  }

  adminWiseApm(userId:any){
    this.router.navigate(['/appointment/appointment-byAdmin',{userId:userId}])
  }

}
