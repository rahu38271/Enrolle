import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service'
import { LoaderService } from 'src/app/services/loader.service';
import { AppointmentService } from 'src/app/services/appointment.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'


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
  anniDate;
  appointmentModal:any ={}; 
  UserId:any;
  roleID:any;

  minDate:String = new Date().toISOString();
  maxDate:String = new Date().toISOString();

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
    private router:Router,
    private contact:ContactService,
    private loader:LoaderService,
    private appointment:AppointmentService,
    private toast:IonicToastService,
    
    ) { }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
     this.getDistrict();
  }

  getDistrict(){
    this.appointmentModal = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data)=>{
      if(data.length > 0){
        this.districtList = data;
      }
    })
  }

  getTaluka(dId:any){
    this.contact.getTalukaData(dId).subscribe((data)=>{
      if(data.length > 0){
        this.appointmentModal.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    })
  }

  resetForm(){
    this.myForm.reset();
  }

  save(){
    this.loader.showLoading();
    var dateparts = this.appointmentModal.appointmentDate.split(' ');
    var time= dateparts[1].split(':');
    var hr = dateparts[2] == 'PM'?(Number(time[0])+12)+':'+time[1] :dateparts[1];
    this.appointmentModal.id = Number(this.appointmentModal.id)
    this.appointmentModal.userId = Number(this.UserId)
    this.appointmentModal.wardNo = Number(this.appointmentModal.wardNo);
    this.appointmentModal.pinCode = Number(this.appointmentModal.pinCode);
    this.appointmentModal.AppointmentDate = dateparts[0]+' '+hr;
    if(this.appointmentModal.fileName == ''){
      this.appointmentModal.fileName = ''
    }
    else{
      this.appointmentModal.fileName = this.appointmentModal.fileName
    }
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


}
