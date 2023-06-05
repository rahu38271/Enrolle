import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service'
import { LoaderService } from 'src/app/services/loader.service';
import { AppointmentService } from 'src/app/services/appointment.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  year : number = new Date().getFullYear();
  file:any;
  myForm;
  districtList: any;
  talukaList: any;
  id: any;
  anniDate;
  appointments:any ={}; 
  UserId:any;
  adminId:any;
  roleID:any;
  superAdminId:any;
  name:any;
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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
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
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
    this.superAdminId = localStorage.getItem("superAdminId");
    if(this.roleID==2 ){
      this.adminId = this.UserId
    }
    else{
      this.adminId = this.superAdminId
    }
     this.getDistrict();
  }

  getDistrict(){
    this.appointments = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data)=>{
      if(data.length > 0){
        this.districtList = data;
      }
    })
  }

  getTaluka(dId:any){
    this.contact.getTalukaData(dId).subscribe((data)=>{
      if(data.length > 0){
        this.appointments.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    })
  }

  resetForm(){
    this.myForm.reset();
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    this.file=file;
  }

  save(){
    debugger;
    this.loader.showLoading();
    var dateparts = this.appointments.appointmentDate.split(' ');
    var time= dateparts[1].split(':');
    var hr = dateparts[2] == 'PM'?(Number(time[0])+12)+':'+time[1] :dateparts[1];
    this.appointments.id = Number(this.appointments.id);
    this.appointments.adminName = this.name;
    this.appointments.userName = this.name;
    this.appointments.userId = Number(this.UserId)
    if(this.appointments.wardNo == 0 || this.appointments.wardNo == ''){
      this.appointments.wardNo = null
    }
    else{
      this.appointments.wardNo = Number(this.appointments.wardNo);
    }
    if(this.appointments.pinCode == 0 || this.appointments.pinCode == ''){
      this.appointments.pinCode = null
    }
    else{
      this.appointments.pinCode = Number(this.appointments.pinCode);
    }
    
    this.appointments.adminId = Number(this.UserId);
    this.appointments.appointmentDate = dateparts[0]+' '+hr;
    if(this.file==undefined){
      this.file = ""
    }
    else{
      this.file = this.file
    }
    if(this.appointments.pinCode == 0){
      this.appointments.pinCode = null
    }
    if(this.appointments.wardNo == 0){
      this.appointments.wardNo = null
    }
    this.appointments =  JSON.stringify(this.appointments);
    this.appointment.addSingleAppointment(this.file, this.appointments).subscribe(data=>{
      if(data==2){
        this.loader.hideLoader();
        //this.appointments = {};
        this.toast.presentToast("Appointment updated successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/appointment/all-appointments']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Appointment not updated", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      
    })
  }

  onSubmit(f: NgForm) {
    if (this.appointments.invalid) {
      return;
    }
    f.resetForm();
    // window.location.reload();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }


}
