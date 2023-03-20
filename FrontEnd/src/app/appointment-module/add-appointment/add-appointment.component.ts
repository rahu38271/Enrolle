import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service'
import { AppointmentService } from 'src/app/services/appointment.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service'

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {

  appointmentModal:any;
  appointmenDetails:any;
  districtList: any;
  talukaList: any;
  year : number = new Date().getFullYear();

  myForm;
  status = '';
  subject = '';
  Edate = '';
  responsibility = '';
  priority = '';
  inpresence = '';
  place = '';
  date = '';

  constructor(
    private loader:LoaderService,
    private appointment:AppointmentService,
    private toast:IonicToastService,
    private router:Router,
    private contact:ContactService
  ) { }

  ngOnInit() {
    this.getDistrict();
  }

  getDistrict() {
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.appointmentModal.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  addAppointment(){
    this.loader.showLoading();
    this.appointment.addSingleAppointment(this.appointmentModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.appointmenDetails = {};
        this.toast.presentToast("Appointment added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/appointment']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Appointment not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      
    })
  }

  resetForm(){
    this.myForm.reset();
  }

}
