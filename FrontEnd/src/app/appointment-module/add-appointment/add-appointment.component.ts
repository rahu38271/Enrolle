import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service'
import { AppointmentService } from 'src/app/services/appointment.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {

  appointmentModal:any={};
  districtList: any;
  talukaList: any;
  year : number = new Date().getFullYear();
  AppointmentDate: String = new Date().toISOString();
  myForm;
  status = '';
  subject = '';
  Edate = '';
  responsibility = '';
  priority = '';
  inpresence = '';
  place = '';
  date = '';

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

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
    this.appointmentModal.AppointmentDate = this.appointmentModal.AppointmentDate;
    this.appointmentModal.WardNo = Number(this.appointmentModal.WardNo);
    this.appointmentModal.PinCode = Number(this.appointmentModal.PinCode);
    this.loader.showLoading();
    this.appointment.addSingleAppointment(this.appointmentModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.appointmentModal = {};
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

  onSubmit(f: NgForm) {
    if (this.appointmentModal.invalid) {
      return;
    }
    f.resetForm();
    // window.location.reload();
  }

  resetForm(){
    this.myForm.reset();
  }

}
