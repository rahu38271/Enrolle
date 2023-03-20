import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service'

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {

  year : number = new Date().getFullYear();

  myForm;
  districtList: any;
  talukaList: any;
  id: any;
  edModal: any = {};
  anniDate;
 EditData:any ={}; 

  constructor(
    private router:Router,
    private contact:ContactService
    ) { }

  ngOnInit() {
     this.getDistrict();
  }

  getDistrict(){
    this.EditData = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data)=>{
      if(data.length > 0){
        this.districtList = data;
      }
    })
  }

  getTaluka(dId:any){
    this.contact.getTalukaData(dId).subscribe((data)=>{
      if(data.length > 0){
        this.EditData.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    })
  }

  resetForm(){
    this.myForm.reset();
  }

}
